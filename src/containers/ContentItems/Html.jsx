import React from 'react';
import { DragType, ContentType } from '../../lib/enum';
import { DragSource } from 'react-dnd';
import * as Util from './ContentDragUtil';


class Html extends React.Component {
  static type = ContentType.HTML;
  render(){
    const { connectDragSource, isDragging, key } = this.props;
  return connectDragSource(<li key={key}><i className="mdi-action-settings-ethernet" /><p>Html</p></li>);
  }
}

export default DragSource(DragType.CONTENT, Util.getSource({ type: ContentType.HTML }), Util.getCollect())(Html);