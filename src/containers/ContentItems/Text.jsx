import React from 'react';
import { DragType, ContentType } from '../../lib/enum';
import { DragSource } from 'react-dnd';
import * as Util from './ContentDragUtil';


class Text extends React.Component {
  static type = ContentType.TEXT;
  render(){
    const { connectDragSource, isDragging, key } = this.props;
  return connectDragSource(<li key={key}><i className="mdi-content-text-format" /><p>Text</p></li>);
  }
}

export default DragSource(DragType.CONTENT, Util.getSource({ type: ContentType.TEXT }), Util.getCollect())(Text);