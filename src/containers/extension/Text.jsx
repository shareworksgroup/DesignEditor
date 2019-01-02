import React from 'react';
import Extension from './Extension';
import { ContentType } from '../../lib/enum';

class Text extends Extension {
  getIconClass(){
    return 'mdi-content-text-format';
  }

  getContentType(){
    return ContentType.TEXT;
  }

  getLabel(){
    return 'Text';
  }

  render(){
    
  }
}

export default Text;