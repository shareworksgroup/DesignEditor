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

  clickIamge = () => {
    alert(2222)
  }

  render(){
    const { url } = this.props;
    return <div className="ds_content_image">
      <div>
        { url ? <img src={url} /> : <p onClick={this.clickIamge}>IMAGE</p> }
      </div>
    </div>
  }
}

export default Image;