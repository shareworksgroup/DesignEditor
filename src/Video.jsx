import React from 'react';
import { Extension, PropertyWidget, PropertyGroup } from './containers/Container';


const { Space, Link, Align, Input, Switch } = PropertyWidget;
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

  getInitialAttribute(){
    return {
      containerPadding: '10px',
      textAlign: 'center',
      fullWidth: false,
      url: ''
    };
  }

  getProperties(values, update) {
    const { url, textAlign, containerPadding, fullWidth } = values;
    return <React.Fragment>
      <PropertyGroup title="LINK">
        <Input title="Video URL" value={url} attribute="url" desc="Add a YouTube or Vimeo URL to automatically generate a preview image. The image will link to the provided URL." onUpdate={update}/>
      </PropertyGroup>
      <PropertyGroup title="SPACING">
        <Switch title="Full Width" checked={fullWidth} attribute="fullWidth" onUpdate={update}/>
        <Align title="Align" align={textAlign} onUpdate={update} />
      </PropertyGroup>
      <PropertyGroup title="GENERAL">
        <Space title="Container Padding" value={containerPadding} attribute="containerPadding" onUpdate={update}/>
      </PropertyGroup>
    </React.Fragment>
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
        { url ? <video controls src={url} style={videoStyle} /> : <p><i className="mdi-av-play-arrow"></i></p> }
      </div>
    </div>;
  }
}

export default Video;