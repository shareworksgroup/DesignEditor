import React from 'react';
import { DragType, OperationMode } from '../../../lib/enum';
import { DragSource, ConnectDragSource } from 'react-dnd';
import * as Util from '../../common/DragUtil';

function ContentFactory(contentType, label, iconClass) {
  
  @(DragSource as any)(DragType.CONTENT, Util.getSource({ mode: OperationMode.INSERT, type: contentType }), Util.getCollect())
  class ContentElement extends React.Component<IContentElementProps> {
    static type = contentType;
    render() {
      const { connectDragSource, key } = this.props;
      return connectDragSource(<li key={key}><i className={iconClass} /><p>{label}</p></li>);
    }
  }

  interface IContentElementProps {
    connectDragSource?: ConnectDragSource;
    key?: string;
  }

  return ContentElement;
}

export default ContentFactory;