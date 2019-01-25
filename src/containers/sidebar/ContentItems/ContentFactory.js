import React from 'react';
import { DragType, OperationMode } from '../../../lib/enum';
import { DragSource } from 'react-dnd';
import * as Util from '../../common/DragUtil';


function ContentFactory(contentType, label, iconClass) {
  
  @DragSource(DragType.CONTENT, Util.getSource({ mode: OperationMode.INSERT, type: contentType }), Util.getCollect())
  class ContentElement extends React.Component {
    static type = contentType;
    render() {
      const { connectDragSource, key } = this.props;
      return connectDragSource(<li key={key}><i className={iconClass} /><p>{label}</p></li>);
    }
  }

  return ContentElement;
}

export default ContentFactory;