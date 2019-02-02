import React from 'react';
import { findDOMNode } from 'react-dom';
import { inject, observer } from 'mobx-react';
import { DropTarget, DragSource } from 'react-dnd';
import Throttle from 'lodash-decorators/throttle';
import classnames from 'classnames';
import rootStore from '../../store/store';
import Column from './Column';
import PlaceHolder from '../common/PlaceHolder';
import Selector from '../common/Selector';
import { DragType, OperationMode, Position } from '../../lib/enum';
import { getPositionByMiddleOffset, defaultPosition } from '../../lib/util';
import * as Util from '../common/DragUtil';



const target = {
  drop(props, monitor, component) {
    const item = monitor.getItem();
    if (item.mode === OperationMode.INSERT) {
      rootStore.DesignState.execCommand('insertRow', item, props.guid, item.position);
    } else if (item.mode === OperationMode.MOVE) {
      item.guid !== props.guid && rootStore.DesignState.execCommand('moveRow', item, props.guid, item.position);
    }
  },
  hover(props, monitor, component){
    const dom = findDOMNode(component);
    const position = getPositionByMiddleOffset(dom, monitor.getClientOffset());
    monitor.getItem().position = position;
    component.getDecoratedComponentInstance().wrappedInstance.setPosition(position);
  },
  canDrop(props, monitor, component){
    const item = monitor.getItem();
    if (props.guid === item.guid) {
      return false;
    }
    return true;
  }
};

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
});


@DropTarget([DragType.ROW], target, collect)
@DragSource(
  DragType.ROW, 
  Util.getSource({ mode: OperationMode.MOVE, position: Position.BEFORE }, (props) => ({ guid: props.guid, type: props.subtype })), 
  Util.getCollect()
)
@inject('rootStore')
@observer
class Row extends React.Component {

  constructor(props) {
    super(props);
    this.guid = props.guid;
    this.subtype = props.subtype;
  }
  
  state = {
    position: defaultPosition
  }

  @Throttle(150)
  setPosition(position) {
    this.setState({ position });
  }

  onSelect = (e) => {
    e.stopPropagation();
    const { guid, rootStore: { DesignState } } = this.props;
    DesignState.setSelected(guid);
  }

  onDelete = () => {
    const { guid, rootStore: { DesignState } } = this.props;
    DesignState.execCommand('deleteRow', guid);
  }

  onCopy = () => {
    const { guid, rootStore: { DesignState } } = this.props;
    DesignState.execCommand('copyRow', guid);
  }

  render() {
    const { connectDropTarget, connectDragSource, isOver, canDrop, width, cells = [] , guid, rootStore: { DesignState } } = this.props;
    const row = DesignState.getRow(guid);
    if (!row) {
      return null;
    }
    const { backgroundColor, columnsBackgroundColor, padding, backgroundImage, fullWidth, repeat, center  } = row.values;
    const bgStyle = {
      backgroundImage:`url(${backgroundImage})`,
      backgroundRepeat: `${repeat?'repeat':'no-repeat'}`,
      backgroundPosition: `${center?'center top':'left top'}`,
    };
    const wrapperStyle = fullWidth ? bgStyle : {};
    const contentStyle = fullWidth ? {} : bgStyle;
    const total = cells.reduce((i, total) => i+total, 0);
    return <div>
        { isOver && canDrop && this.state.position === Position.BEFORE && <PlaceHolder /> }
        {connectDropTarget(<div className={classnames("ds-layer ds-layer-selectable", (guid === DesignState.selected) && 'ds-layer-selected')} onMouseUp={this.onSelect}>
          <Selector
            type="row"
            onDelete={this.onDelete}
            onCopy={this.onCopy}
            onRef={(dom) => {connectDragSource(dom);}}/>
          <div className="u_row" style={{
            backgroundColor,
            padding,
            ...wrapperStyle
          }}>
            <div className="container" style={{
              maxWidth: width,
              ...contentStyle,
              }}>
              <div className="row" style={{
                backgroundColor: columnsBackgroundColor,
              }}>
                {
                  cells.map((i, index) => (<Column
                    guid={row.columns[index].values._meta.guid}
                    key={row.columns[index].values._meta.guid}
                    column={row.columns[index]} size={12*i/total} />))
                }
              </div>
            </div>
          </div>
        </div>)}
        { isOver && canDrop && this.state.position === Position.AFTER && <PlaceHolder /> }
    </div>;
  }
}


export default Row;