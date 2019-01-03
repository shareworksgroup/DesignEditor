import React from 'react';
import { Extension } from './containers/Container';

class Video extends Extension {
  getIconClass() {
    return 'mdi-maps-local-movies';
  }

  getContentType() {
    return 'video';
  }

  getLabel() {
    return 'Video';
  }

  render() {
    const { url } = this.props;
    return <div className="ds_content_video">
      <div>
        { url ? <video src={url} /> : <p><i className="mdi-av-play-arrow"></i></p> }
      </div>
    </div>;
  }
}

export default Video;