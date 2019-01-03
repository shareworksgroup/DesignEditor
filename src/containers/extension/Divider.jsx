import React from 'react';
import Extension from './Extension';
import { ContentType } from '../../lib/enum';

class Divider extends Extension {
  getIconClass(){
    return 'mdi-content-remove';
  }

  getContentType(){
    return ContentType.DIVIDER;
  }

  getLabel(){
    return 'Divider';
  }

  render(){
    return <div className="ds_content_divider">
      <hr />
    </div>
  }
}

export default Divider;