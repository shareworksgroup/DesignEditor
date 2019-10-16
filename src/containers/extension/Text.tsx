import React from 'react';

import Extension from './Extension';
import { ContentType, Fonts } from '../../lib/enum';
import Group from '../sidebar/Property/Group';
import { TinyMce } from '../../components';
import { Align, LineHeight, Color, Space } from '../sidebar/Property/items';


class Text extends Extension<ITextProps> {

  getIconClass() {
    return 'icon icon-text';
  }

  getContentType() {
    return ContentType.TEXT;
  }

  getLabel() {
    return 'Text';
  }

  toHtml(data) {
    const { text, textAlign, lineHeight, containerPadding, color } = data;

    return `<div>
      <div style="text-align:${textAlign};color:${color};line-height:${lineHeight}%;padding:${containerPadding}">
        <p>${text}</p>
      </div>
    </div>`;
  }

  getInitialAttribute(): ITextProps {
    return {
      color: '#000',
      text: '<p>Hello World</p>',
      textAlign: 'center',
      lineHeight: 120,
      padding: '5px 10px 10px 10px',
      containerPadding: '10px'
    };
  }

  getProperties(values, update) {
    const { color, textAlign, lineHeight, containerPadding } = values;
    return <React.Fragment>
      <Group title="TEXT">
        <Color title="Color" value={color} attribute="color" onUpdate={update} />
        <Align align={textAlign} onUpdate={update} />
        <LineHeight lineHeight={lineHeight} onUpdate={update} />
      </Group>
      <Group title="GENERAL">
        <Space title="Container Padding" value={containerPadding} attribute="containerPadding" onUpdate={update} />
      </Group>
    </React.Fragment>;
  }

  render() {
    const { focus = false, text, textAlign, lineHeight, containerPadding, color, _meta, onUpdate } = this.props;
    return <div className="ds_content_text">
      <div id={`id_${_meta.guid}`} style={{
        textAlign,
        color,
        lineHeight: `${lineHeight}%`,
        padding: containerPadding,
      }}>
        <TinyMce
          config={{
            plugins: ['link', 'textcolor', 'colorpicker', 'lists', 'autolink'],
            toolbar: ['undo redo | bold italic underline | fontselect fontsizeselect',
              'forecolor backcolor | alignleft aligncenter alignright alignfull | numlist bullist outdent indent | link unlink'],
            font_formats: (() => Object.keys(Fonts).map(i => `${i}=${Fonts[i]}`).join(';'))(),
            fontsize_formats: '8px 10px 12px 14px 16px 18px 20px 24px 26px 28px 30px 36px 40px 44px 48px 60px 72px',
          }}
          value={text} focus={focus} onChange={onUpdate}>
          <div />
        </TinyMce>
      </div>
    </div>;
  }
}

interface ITextProps {
  color: string;
  text: string;
  textAlign: TextAlgin;
  lineHeight: number;
  padding: string;
  containerPadding: string;
}

export default Text;