import React from 'react';
import Group from '../sidebar/Property/Group';
import { Space, Link, Align, Input, Switch, ImageEditor, NumberItem } from '../sidebar/Property/items';
import Extension from './Extension';
import { ContentType } from '../../lib/enum';

class Image extends Extension<IImageProps> {
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
    const { url, containerPadding, link, linkType, textAlign, alter, fullWidth, width, height } = data;
    const imgWidthStyle = fullWidth ? ` width: 100% ` : width === -1 ? ` max-width: 100% ` : ` width: ${width}px `;
    const imgHeightStyle = fullWidth ? `` : height === -1 ? `` : `height:${height}px`;

    return `<div 
    style="padding:${containerPadding}">
      <div style="text-align:${textAlign}">
        <a href="${link || 'javascript:void(0)'}" style="text-decoration: none; cursor: ${link ? 'pointer' : 'default'}"
        target="${linkType}"><img alt="${alter}" src="${url}" style="${[imgWidthStyle, imgHeightStyle].join(';')}" /></a>
      </div>
    </div>`;
  }

  getInitialAttribute(): IImageProps {
    return {
      link: '',
      linkType: '_self',
      containerPadding: '10px',
      textAlign: 'center',
      fullWidth: false,
      alter: 'Image',
      url: '',
      width: -1,
      height: -1,
    };
  }

  getProperties(values, update) {
    const { link, linkType, alter, fullWidth, textAlign, url, containerPadding, width, height } = values;
    return <React.Fragment>
      <Group title="IMAGE">
        <ImageEditor key={values._meta.guid} url={url} attribute="url" onUpdate={update} />
        <Switch title="Full Width" checked={fullWidth} attribute="fullWidth" onUpdate={update} />
        {!fullWidth && <React.Fragment>
          <NumberItem title="Width(-1 is auto)" attribute="width" value={width} onUpdate={update} step={1} max={800} min={-1} />
          <NumberItem title="Height(-1 is auto)" attribute="height" value={height} onUpdate={update} step={1} max={800} min={-1} />
        </React.Fragment>}
        <Align title="Align" align={textAlign} onUpdate={update} />
        <Input title="Alternate Text" value={alter} attribute="alter" onUpdate={update} />
      </Group>
      <Group title="ACTION">
        <Link link={link} linkType={linkType} title="Image Link" onUpdate={update} />
      </Group>
      <Group title="GENERAL">
        <Space title="Container Padding" value={containerPadding} attribute="containerPadding" onUpdate={update} />
      </Group>
    </React.Fragment>;
  }

  render() {
    const { url, containerPadding, textAlign, alter, fullWidth, height, width } = this.props;
    const imgWidthStyle = fullWidth ? { width: '100%' } : width === -1 ? { maxWidth: '100%' } : { width };
    const imgHeightStyle = fullWidth ? {} : height === -1 ? {} : { height };

    return <div className="ds_content_image"
      style={{
        padding: containerPadding,
      }}>
      <div style={{
        textAlign,
      }}>
        {url ? <img alt={alter} src={url} style={{ verticalAlign: 'top', ...imgWidthStyle, ...imgHeightStyle }} /> : <p>IMAGE</p>}
      </div>
    </div>;
  }
}

interface IImageProps {
  link: string;
  linkType: string;
  containerPadding: string;
  textAlign: TextAlgin;
  fullWidth: false;
  alter: string;
  url: string;
  width: number;
  height: number;
}

export default Image;