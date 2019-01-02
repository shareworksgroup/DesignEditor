import React from 'react';
import Extension from './Extension';
import { ContentType } from '../../lib/enum';

class Image extends Extension {
  getIconClass(){
    return 'mdi-maps-satellite';
  }

  getContentType(){
    return ContentType.IMAGE;
  }

  getLabel(){
    return 'Image';
  }

  render(){
    
  }
}

export default Image;