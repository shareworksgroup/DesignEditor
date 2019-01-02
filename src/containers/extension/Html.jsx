import React from 'react';
import Extension from './Extension';
import { ContentType } from '../../lib/enum';

class Html extends Extension {
  getIconClass(){
    return 'mdi-action-settings-ethernet';
  }

  getContentType(){
    return ContentType.HTML;
  }

  getLabel(){
    return 'Html';
  }

  render(){
    
  }
}

export default Html;