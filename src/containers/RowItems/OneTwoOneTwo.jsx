import React from 'react';
import { DragType, RowType } from '../../lib/enum';
import * as Util from './RowDragUtil';
import { DragSource } from 'react-dnd';

class OneTwoOneTwo extends React.Component {
  render() {
    const { connectDragSource, isDragging, key } = this.props;
    return connectDragSource(<li>
      <div className="ds-row-column col-2">
        <div className="ds-row-content"></div>
      </div>
      <div className="ds-row-column col-4">
        <div className="ds-row-content"></div>
      </div>
      <div className="ds-row-column col-2">
        <div className="ds-row-content"></div>
      </div>
      <div className="ds-row-column col-4">
        <div className="ds-row-content"></div>
      </div>
    </li>);
  }
}

export default DragSource(DragType.ROW, Util.getSource({ type: RowType.ONETWOONETWO, cells: [1,2,1,2] }), Util.getCollect())(OneTwoOneTwo);

