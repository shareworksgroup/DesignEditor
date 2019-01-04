 import React from 'react';
import { inject, observer } from 'mobx-react';
import rootStore from '@store/store';
import { DragType, OperationMode } from '../lib/enum';
import { DropTarget } from 'react-dnd';
import PlaceHolder from './common/PlaceHolder';
import RowList from './sidebar/RowItems';
import Row from './editor/Row';

const target = {
  drop(props, monitor, component) {

    const item = monitor.getItem();
    if (item.mode === OperationMode.INSERT) {
      rootStore.DesignState.addRow(item);
    } else if (item.mode === OperationMode.MOVE) {
      rootStore.DesignState.moveRow(item);
    }
    
  },
  canDrop(props, monitor, component){
    return monitor.isOver({ shallow: true });
  }
};

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
});

class Body extends React.Component {

  onBodyClick = () => {
    const { rootStore: { DesignState } } = this.props;
    DesignState.setSelected(null);
    console.log('body click')
  }

  render(){
    const { connectDropTarget, isOver, canDrop, rootStore: { DesignState } } = this.props;
    const data = DesignState.data;
    return connectDropTarget(<div className="ds-body design-web" onMouseUp={this.onBodyClick}>
     {
       data.body.rows.map(row => {
         const meta = row.values._meta;
         return <Row key={meta.guid} guid={meta.guid} subtype={meta.subtype} cells={row.cells} />
        })
      }
      { (isOver && canDrop) && <PlaceHolder />}
    </div>);
  }
}

export default DropTarget([DragType.ROW], target, collect)(inject('rootStore')(observer(Body)));