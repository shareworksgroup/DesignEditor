import React from 'react';
import { DragType, RowType } from '../../lib/enum';
import * as Util from './RowDragUtil';
import { DragSource } from 'react-dnd';

class Single extends React.Component {
  static type = RowType.SINGLE;
  render() {
    const { connectDragSource, isDragging, key } = this.props;
    return connectDragSource(<li>
      <div className="ds-row-column col-12">
        <div className="ds-row-content"></div>
      </div>
    </li>);
  }
}


const DragSingle = DragSource(DragType.ROW, Util.getSource({ type: RowType.SINGLE, cells: [1] }), Util.getCollect())(Single);

export default DragSingle;

