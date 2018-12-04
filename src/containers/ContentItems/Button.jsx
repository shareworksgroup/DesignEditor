import React from 'react';
import { DragType, ContentType } from '../../lib/enum';
import { DragSource } from 'react-dnd';
import * as Util from './ContentDragUtil';


class Button extends React.Component {
  static type = ContentType.BUTTON;
  render(){
    const { connectDragSource, isDragging, key } = this.props;
    console.log(isDragging);
  return connectDragSource(<li key={key}><i className="mdi-image-crop-7-5" /><p>Button</p></li>);
  }
}

const DragButton = DragSource(DragType.CONTENT, Util.getSource({ type: ContentType.BUTTON }), Util.getCollect())(Button);

export default DragButton;