import React from 'react';
import PlaceHolder from '../common/PlaceHolder';
import { inject, observer } from 'mobx-react';
import rootStore from '@store/store';
import { DragType, RowType } from '../../lib/enum';
import { DropTarget, DargSource } from 'react-dnd';

const target = {
  drop(props, monitor, component) {
    rootStore.DesignState.addContent(monitor.getItem(), props.column.values._meta);
    console.log(props.column.values._meta, monitor.getItem(), component);
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

class Column extends React.Component {


  render() {
    const { connectDropTarget, isOver, canDrop, guid, size, rootStore: { DesignState }  } = this.props;
    const column = DesignState.getColumn(guid);
    console.log(column, guid,  'render again...');
    return connectDropTarget(<div className={`col-${size} u_column`} >
      {isOver && canDrop && <PlaceHolder style={{position: 'absolute', top:0, left:0, width: '100%'}} />}
      { column.contents.length === 0 && <div className="blockbuilder-placeholder-empty">
        <span>No content here. Drag content from right.</span>
      </div>}
      {
        column.contents.map(i => <span key={i.type}>{i.type}</span>)
      }
  </div>);
  }
}

export default inject('rootStore')(observer(DropTarget([DragType.CONTENT], target, collect)(Column)));