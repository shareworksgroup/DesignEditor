 import React from 'react';
import { inject, observer } from 'mobx-react';
import rootStore from '@store/store';
import { DragType } from '../lib/enum';
import { DropTarget } from 'react-dnd';
import PlaceHolder from './common/PlaceHolder';
import RowList from './sidebar/RowItems';
import RowEditor from './editor/RowEditor';

const target = {
  drop(props, monitor, component) {
    rootStore.DesignState.addRow(monitor.getItem());
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

  render(){
    const { connectDropTarget, isOver, canDrop, rootStore: { DesignState } } = this.props;
    const data = DesignState.getData();
    return connectDropTarget(<div className="ds-body design-web">
     {
       data.body.rows.map(row => {
         const meta = row.values._meta;
         return <RowEditor key={meta.guid} guid={meta.guid} subtype={meta.subtype} cells={row.cells} />
        })
      }
      { (isOver && canDrop) && <PlaceHolder />}
    </div>);
  }
}

export default inject('rootStore')(observer(DropTarget([DragType.ROW], target, collect)(Body)));