import React from 'react';
import { DragType, RowType } from '../../lib/enum';
import * as Util from './RowDragUtil';
import { DragSource } from 'react-dnd';

class TwoOne extends React.Component {
  render() {
    const { connectDragSource, isDragging, key } = this.props;
    return connectDragSource(<li>
      <div className="ds-row-column col-8">
        <div className="ds-row-content"></div>
      </div>
      <div className="ds-row-column col-4">
        <div className="ds-row-content"></div>
      </div>
    </li>);
  }
}

export default DragSource(DragType.ROW, Util.getSource({ type: RowType.TWOONE, cells: [2,1] }), Util.getCollect())(TwoOne);

