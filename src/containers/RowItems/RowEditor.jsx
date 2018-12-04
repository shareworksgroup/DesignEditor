import React from 'react';
import { inject, observer } from 'mobx-react';
import rootStore from '@store/store';
import Column from '../common/Column';
import PlaceHolder from '../common/PlaceHolder';
import Selector from '../common/Selector';
import { DragType, RowType } from '../../lib/enum';
import { DropTarget, DargSource } from 'react-dnd';

const target = {
  drop(props, monitor, component) {
    console.log(props, monitor.getItem(), component);
    rootStore.DesignState.insertRow(monitor.getItem(), props.guid);
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

class RowEditor extends React.Component {
  constructor(props) {
    super(props);
    this.guid = props.guid;
    this.subtype = props.subtype;
  }
  render() {
    const { connectDropTarget, isOver, canDrop, cells = [] , guid, rootStore: { DesignState } } = this.props;
    const row = DesignState.getRow(guid);
    const total = cells.reduce((i, total) => i+total, 0);
    return <React.Fragment>
        { isOver && canDrop && <PlaceHolder /> }
        {connectDropTarget(<div className="blockbuilder-layer blockbuilder-layer-selectable">
          <Selector />
          <div className="u_row" style={{padding: 10}}>
            <div className="container" style={{maxWidth: 600}}>
              <div className="row">
                {
                  cells.map((i, index) => (<Column
                    guid={row.columns[index].values._meta.guid}
                    key={row.columns[index].values._meta.guid}
                    column={row.columns[index]} size={12*i/total} />))
                }
              </div>
            </div>
          </div>
        </div>)}
    </React.Fragment>;
  }
}

export default inject('rootStore')(observer(DropTarget([DragType.ROW], target, collect)(RowEditor)));