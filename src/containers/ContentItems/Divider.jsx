import React from 'react';
import { DragType, ContentType } from '../../lib/enum';
import { DragSource } from 'react-dnd';
import * as Util from './ContentDragUtil';


class Divider extends React.Component {
  static type = ContentType.DIVIDER;
  render(){
    const { connectDragSource, isDragging, key } = this.props;
  return connectDragSource(<li key={key}><i className="mdi-content-remove" /><p>DIVIDER</p></li>);
  }
}

export default DragSource(DragType.CONTENT, Util.getSource({ type: ContentType.DIVIDER }), Util.getCollect())(Divider);