import React from 'react';
import Extension from './Extension';
import { ContentType } from '../../lib/enum';

class Button extends Extension {
  getIconClass() {
    return 'mdi-image-crop-7-5';
  }

  getContentType() {
    return ContentType.BUTTON;
  }

  getLabel() {
    return 'Button';
  }

  render() {
    console.log(this.props)
    return <div class="ds_content_button">
    <div style={{
      textAlign: 'center'
    }}>
    <a class="editable" >
    Button Text
    </a>
    </div>
    </div>;
  }
}

export default Button;