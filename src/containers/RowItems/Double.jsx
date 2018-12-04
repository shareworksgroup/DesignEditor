import React from 'react';
import { DragType, RowType } from '../../lib/enum';
import * as Util from './RowDragUtil';
import { DragSource } from 'react-dnd';

class Double extends React.Component {
  render() {
    const { connectDragSource, isDragging, key } = this.props;
    return connectDragSource(<li>
      <div className="ds-row-column col-6">
        <div className="ds-row-content"></div>
      </div>
      <div className="ds-row-column col-6">
        <div className="ds-row-content"></div>
      </div>
    </li>);
  }
}

class DoubleEditor extends React.Component {
  constructor(props) {
    super(props);
    this.guid = props.guid;
  }
  render() {
    return <div className="blockbuilder-layer blockbuilder-layer-selectable">
      <Selector />
      <div className="u_row" style={{padding: 10}}>
        <div className="container" style={{maxWidth: 600}}>
          <div className="row">
            <Column size={12} />
            <Column size={12} />
          </div>
        </div>
      </div>
    </div>;
  }
}

export default DragSource(DragType.ROW, Util.getSource({ type: RowType.DOUBLE, cells: [1,1] }), Util.getCollect())(Double);

