import React from 'react';
import Group from '../sidebar/Property/Group';
import { Space, Link, Align, Input, Switch, ImageEditor } from '../sidebar/Property/items';
import Extension from './Extension';
import { ContentType } from '../../lib/enum';

class Image extends Extension {
  getIconClass() {
    return 'icon icon-image';
  }

  getContentType() {
    return ContentType.IMAGE;
  }

  getLabel() {
    return 'Image';
  }

  toHtml(data) {
    const { url, containerPadding, link, linkType, textAlign, alter, fullWidth } = data;
    const imgStyle = fullWidth ? ` width: 100% ` : ` max-width: 100% `;
    return `<div 
    style="padding:${containerPadding}">
      <div style="text-align:${textAlign}">
        <a href="${link}" style="text-decoration: none;" target="${linkType}"><img alt="${alter}" src="${url}" style="${imgStyle}" /></a>
      </div>
    </div>`;
  }

  getInitialAttribute() {
    return {
      link: '',
      linkType: '_self',
      containerPadding: '10px',
      textAlign: 'center',
      fullWidth: false,
      alter: 'Image',
      url: ''
    };
  }

  getProperties(values, update) {
    const { link, linkType, alter, fullWidth, textAlign, url, containerPadding } = values;
    return <React.Fragment>
      <Group title="IMAGE">
        <ImageEditor key={values._meta.guid} attribute="url" onUpdate={update} />
        <Input title="Image URL" value={url} attribute="url" onUpdate={update} />
        <Switch title="Full Width" checked={fullWidth} attribute="fullWidth" onUpdate={update} />
        <Align title="Align" align={textAlign} onUpdate={update} />
        <Input title="Alternate Text" value={alter} attribute="alter" onUpdate={update} />
      </Group>
      <Group title="ACTION">
        <Link link={link} linkType={linkType} title="Image Link" onUpdate={update} />
      </Group>
      <Group title="GENERAL">
        <Space title="Container Padding" value={containerPadding} attribute="containerPadding" onUpdate={update} />
      </Group>
    </React.Fragment>
  }

  render() {
    const { url, containerPadding, textAlign, alter, fullWidth } = this.props;
    const imgStyle = fullWidth ? { width: '100%' } : { maxWidth: '100%' };
    return <div className="ds_content_image"
      style={{
        padding: containerPadding,
      }}>
      <div style={{
        textAlign,
      }}>
        {url ? <img alt={alter} src={url} style={imgStyle} /> : <p>IMAGE</p>}
      </div>
    </div>
  }
}

export default Image;