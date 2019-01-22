import React from 'react';
import { inject, observer } from 'mobx-react';
import rootStore from '../store/store';
import { DragType, OperationMode } from '../lib/enum';
import { DropTarget } from 'react-dnd';
import PlaceHolder from './common/PlaceHolder';
import Row from './editor/Row';

const target = {
  drop(props, monitor, component) {
    const item = monitor.getItem();
    if (item.mode === OperationMode.INSERT) {
      rootStore.DesignState.execCommand('addRow', item);
    } else if (item.mode === OperationMode.MOVE) {
      rootStore.DesignState.execCommand('moveRow', item);
    }
  },
  canDrop(props, monitor) {
    return monitor.isOver({ shallow: true });
  }
};

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
});

@DropTarget([DragType.ROW], target, collect)
@inject('rootStore')
@observer
class Body extends React.Component {

  onBodyClick = () => {
    const { rootStore: { DesignState } } = this.props;
    DesignState.setSelected(null);
  }

  render() {
    const { connectDropTarget, isOver, canDrop, rootStore: { DesignState } } = this.props;
    const data = DesignState.data;
    const { width, backgroundColor, fontFamily, containerPadding } = data.body.values;
    return connectDropTarget(<div className="ds-body design-web" onMouseUp={this.onBodyClick}>
      <div className="u_body" style={{
        width,
        backgroundColor,
        fontFamily,
        padding: containerPadding
      }}>
        {
          data.body.rows.map(row => {
            const meta = row.values._meta;
            return <Row key={meta.guid} guid={meta.guid} subtype={meta.subtype} cells={row.cells} />
          })
        }
        {(isOver && canDrop) && <PlaceHolder />}
      </div>
    </div>);
  }
}

export default Body;