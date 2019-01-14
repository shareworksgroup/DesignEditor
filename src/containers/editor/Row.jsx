import React from 'react';
import { inject, observer } from 'mobx-react';
import { DropTarget, DragSource } from 'react-dnd';
import classnames from 'classnames';
import rootStore from '@store/store';
import Column from './Column';
import PlaceHolder from '../common/PlaceHolder';
import Selector from '../common/Selector';
import { DragType, OperationMode } from '../../lib/enum';
import * as Util from '../common/DragUtil';

const target = {
  drop(props, monitor, component) {
    const item = monitor.getItem();
    if (item.mode === OperationMode.INSERT) {
      rootStore.DesignState.insertRow(monitor.getItem(), props.guid);
    } else if (item.mode === OperationMode.MOVE) {
      rootStore.DesignState.moveRow(item, props.guid);
    }
  },
  canDrop(props){
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
  Util.getSource({ mode: OperationMode.MOVE }, (props) => ({ guid: props.guid, type: props.subtype })), 
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

  onSelect = (e) => {
    e.stopPropagation();
    const { guid, rootStore: { DesignState } } = this.props;
    DesignState.setSelected(guid);
  }

  onDelete = () => {
    const { guid, rootStore: { DesignState } } = this.props;
    DesignState.deleteRow(guid);
  }

  onCopy = () => {
    const { guid, rootStore: { DesignState } } = this.props;
    DesignState.copyRow(guid);
  }

  render() {
    const { connectDropTarget, connectDragSource, isOver, canDrop, cells = [] , guid, rootStore: { DesignState } } = this.props;
    const row = DesignState.getRow(guid);
    const { backgroundColor, columnsBackgroundColor, padding } = row.values;
    const total = cells.reduce((i, total) => i+total, 0);
    return <React.Fragment>
        { isOver && canDrop && <PlaceHolder /> }
        {connectDropTarget(<div className={classnames("blockbuilder-layer blockbuilder-layer-selectable", (guid === DesignState.selected) && 'blockbuilder-layer-selected')} onMouseUp={this.onSelect}>
          <Selector
            type="row"
            onDelete={this.onDelete}
            onCopy={this.onCopy}
            onRef={(dom) => {connectDragSource(dom);}}/>
          <div className="u_row" style={{
            backgroundColor,
            padding,
          }}>
            <div className="container" style={{
              maxWidth: 600,
              backgroundColor: columnsBackgroundColor
              }}>
              <div className="row">
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
    </React.Fragment>;
  }
}


export default Row;