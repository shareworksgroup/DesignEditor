import React from 'react';
import { Extension, PropertyWidget, PropertyGroup } from './entry';

const { Space, Align, Input, Switch } = PropertyWidget;

class Video extends Extension<IVideoProps> {
  getIconClass() {
    return 'icon icon-video';
  }

  getContentType() {
    return 'video';
  }

  getLabel() {
    return 'Video';
  }

  toHtml(data) {
    const { url, containerPadding, textAlign, fullWidth } = data;
    const videoStyle = fullWidth ? ` width: 100% ` : ` max-width: 100% `;
    return `<div style="padding:${containerPadding}">
      <div style="text-align:${textAlign}">
        <video controls src="${url}" style="${videoStyle};vertical-align: top;" />
      </div>
    </div>`;
  }

  getInitialAttribute(): IVideoProps {
    return {
      containerPadding: '10px',
      textAlign: 'center',
      fullWidth: false,
      url: ''
    };
  }

  getProperties(values: IVideoProps, update) {
    const { url, textAlign, containerPadding, fullWidth } = values;
    return <React.Fragment>
      <PropertyGroup title="LINK">
        <Input
          title="Video URL"
          value={url}
          attribute="url"
          desc="Add a YouTube or Vimeo URL to automatically generate a preview image. The image will link to the provided URL."
          onUpdate={update} />
      </PropertyGroup>
      <PropertyGroup title="SPACING">
        <Switch title="Full Width" checked={fullWidth} attribute="fullWidth" onUpdate={update} />
        <Align title="Align" align={textAlign} onUpdate={update} />
      </PropertyGroup>
      <PropertyGroup title="GENERAL">
        <Space title="Container Padding" value={containerPadding} attribute="containerPadding" onUpdate={update} />
      </PropertyGroup>
    </React.Fragment>;
  }


  render() {
    const { url, containerPadding, textAlign, fullWidth } = this.props;
    const videoStyle = fullWidth ? { width: '100%' } : { maxWidth: '100%' };
    return <div className="ds_content_video"
      style={{
        padding: containerPadding,
      }}
    >
      <div style={{
        textAlign
      }}>
        {url ? <video controls src={url} style={{ ...videoStyle, verticalAlign: 'top' }} /> : <p><i className="icon icon-play-button"></i></p>}
      </div>
    </div>;
  }
}

interface IVideoProps {
  url?: string;
  containerPadding?: string;
  textAlign?: TextAlgin;
  fullWidth?: boolean;
}

export default Video;