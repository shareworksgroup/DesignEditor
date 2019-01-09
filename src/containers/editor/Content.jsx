import React from 'react';
import classnames from 'classnames';
import { inject, observer } from 'mobx-react';
import { DropTarget, DragSource } from 'react-dnd';
import rootStore from '@store/store';
import Column from './Column';
import PlaceHolder from '../common/PlaceHolder';
import Selector from '../common/Selector';
import { DragType, OperationMode } from '../../lib/enum';
import * as Util from '../common/DragUtil';

const target = {
  drop(props, monitor, component) {

    const item = monitor.getItem();
    if (item.mode === OperationMode.INSERT) {
      rootStore.DesignState.insertContent(monitor.getItem(), props.guid, props.columnGuid);
    } else if (item.mode === OperationMode.MOVE) {
      rootStore.DesignState.moveContent(item, props.guid, props.columnGuid);
    }
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

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.guid = props.guid;
    this.subtype = props.subtype;
  }

  onSelect = (e) => {
    const { guid, rootStore: { DesignState } } = this.props;
    DesignState.setSelected(guid);
    e.stopPropagation();
  }

  render() {
    const { connectDropTarget, connectDragSource, isOver, canDrop, children, guid, rootStore: { DesignState } } = this.props;
    return <React.Fragment>
        { isOver && canDrop && <PlaceHolder /> }
        {connectDropTarget(<div className={classnames("blockbuilder-layer blockbuilder-layer-selectable", (guid === DesignState.selected) && 'blockbuilder-layer-selected')}  onMouseUp={this.onSelect}>
          <Selector type="content" onRef={(dom) => {connectDragSource(dom);}} placeholder="Content" selected={guid === DesignState.selected} />
          { children }
        </div>)}
    </React.Fragment>;
  }
}

const Dragger = DragSource(
  DragType.CONTENT, 
  Util.getSource({ mode: OperationMode.MOVE }, (props) => {
    return { guid: props.guid, type: props.type }}), 
  Util.getCollect()
)(inject('rootStore')(observer(Content)));

export default DropTarget([DragType.CONTENT], target, collect)(Dragger);