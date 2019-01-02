import React from 'react';
import { DragType } from '../../../lib/enum';
import { DragSource } from 'react-dnd';
import * as Util from '../../common/DragUtil';

function ContentFactory(contentType, label, iconClass) {

  class ContentElement extends React.Component {
    static type = contentType;
    render(){
      const { connectDragSource, isDragging, key } = this.props;
      console.log(isDragging);
    return connectDragSource(<li key={key}><i className={iconClass} /><p>{label}</p></li>);
    }
  }
  
  const DragElement = DragSource(DragType.CONTENT, Util.getSource({ type: contentType }), Util.getCollect())(ContentElement);
  
  return DragElement;
}

export default ContentFactory;