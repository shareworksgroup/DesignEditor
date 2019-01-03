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
    const { text = "I am text." } = this.props;
    return <div className="ds_content_text">
      <div>
        <p>{text}</p>
      </div>
    </div>
  }
}

export default Text;