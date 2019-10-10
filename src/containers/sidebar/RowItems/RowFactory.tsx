import React from 'react';
import { DragType, OperationMode } from '../../../lib/enum';
import { DragSource, ConnectDragSource } from 'react-dnd';
import * as Util from '../../common/DragUtil';

function RowFactory(rowType, segmentations = [1]): any {

  @(DragSource as any)(DragType.ROW, Util.getSource({ mode: OperationMode.INSERT, type: rowType, cells: segmentations }), Util.getCollect())
  class RowElement extends React.Component<IRowElementProps> {
    static type = rowType;
    render() {
      const { connectDragSource } = this.props;
      const total = segmentations.reduce((i, total) => i + total, 0);
      return connectDragSource(<li>
        {
          segmentations.map((i, index) =>
            (<div key={index} className={`ds-row-column col-${(12 * i / total).toString().replace('.', '')}`}>
              <div className="ds-row-content"></div>
            </div>))
        }
      </li>);
    }
  }

  interface IRowElementProps {
    connectDragSource?: ConnectDragSource;
  }

  return RowElement;
}

export default RowFactory;