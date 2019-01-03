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
    return <div className="ds_content_html">
      <div dangerouslySetInnerHTML={{__html: '<span>he<i style="color:red;font-weight:bold;">ll</i>o world</span>'}}></div>
    </div>
  }
}

export default Html;