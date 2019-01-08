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
    //console.log('insert into row')

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

class Row extends React.Component {

  constructor(props) {
    super(props);
    this.guid = props.guid;
    this.subtype = props.subtype;
  }

  onSelect = (e) => {
    console.log('click row')
    e.stopPropagation();
    const { guid, rootStore: { DesignState } } = this.props;
    DesignState.setSelected(guid);
  }

  render() {
    const { connectDropTarget, connectDragSource, isOver, canDrop, cells = [] , guid, rootStore: { DesignState } } = this.props;
    const row = DesignState.getRow(guid);
    const total = cells.reduce((i, total) => i+total, 0);
    return <React.Fragment>
        { isOver && canDrop && <PlaceHolder /> }
        {connectDropTarget(<div className={classnames("blockbuilder-layer blockbuilder-layer-selectable", (guid === DesignState.selected) && 'blockbuilder-layer-selected')} onMouseUp={this.onSelect}>
          <Selector type="row" onRef={(dom) => {connectDragSource(dom);}}/>
          <div className="u_row">
            <div className="container" style={{maxWidth: 600}}>
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

const Dragger = DragSource(
  DragType.ROW, 
  Util.getSource({ mode: OperationMode.MOVE }, (props) => ({ guid: props.guid, type: props.subtype })), 
  Util.getCollect()
)(inject('rootStore')(observer(Row)));

export default DropTarget([DragType.ROW], target, collect)(Dragger);