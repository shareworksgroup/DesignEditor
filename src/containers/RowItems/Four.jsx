import React from 'react';
import { DragType, RowType } from '../../lib/enum';
import * as Util from './RowDragUtil';
import { DragSource } from 'react-dnd';

class Four extends React.Component {
  render() {
    const { connectDragSource, isDragging, key } = this.props;
    return connectDragSource(<li>
      <div className="ds-row-column col-3">
        <div className="ds-row-content"></div>
      </div>
      <div className="ds-row-column col-3">
        <div className="ds-row-content"></div>
      </div>
      <div className="ds-row-column col-3">
        <div className="ds-row-content"></div>
      </div>
      <div className="ds-row-column col-3">
        <div className="ds-row-content"></div>
      </div>
    </li>);
  }
}

export default DragSource(DragType.ROW, Util.getSource({ type: RowType.FOUR, cells: [1,1,1,1] }), Util.getCollect())(Four);

