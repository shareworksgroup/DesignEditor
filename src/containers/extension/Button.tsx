import React from 'react';
import Extension from './Extension';
import { ContentType } from '../../lib/enum';
import Group from '../sidebar/Property/Group';
import { TinyMce } from '../../components';
import { Link, Colors, Align, LineHeight, BorderRadius, Space, Line } from '../sidebar/Property/items';


class Button extends Extension<IButtonProps> {

  getIconClass() {
    return 'icon icon-button';
  }

  getContentType() {
    return ContentType.BUTTON;
  }

  getLabel() {
    return 'Button';
  }

  toHtml(data) {
    const { text, color, link, linkType, padding, backgroundColor,
      containerPadding, hoverColor, hoverBackgroundColor, textAlign, lineHeight, borderRadius,
      lineColor, lineWidth, lineStyle, _meta } = data;

    const node = document.createElement('div');
    node.innerHTML = text;
    [].slice.call(node.querySelectorAll('p')).forEach(element => (element.style.display = 'inline'));
    const html = node.innerHTML;
    return `<div>
      <div style="text-align:${textAlign};padding:${containerPadding}">
      <style>
        #button_${_meta.guid}:hover{
          color:${hoverColor} !important;
          background-color:${hoverBackgroundColor} !important;
        }
      </style>
      <a target="${linkType}" href="${link || 'javascript:void(0)'}" id="button_${_meta.guid}"
        style="display:inline-block;text-decoration: none;cursor: ${link ? 'pointer' : 'default'};
        color:${color};background-color:${backgroundColor};padding:${padding};line-height:${lineHeight}%;
        border-radius:${borderRadius}px;border:${lineWidth}px ${lineStyle} ${lineColor};">${html}</a>
      </div>
    </div>`;
  }

  getInitialAttribute(): IButtonProps {
    return {
      linkType: '_self',
      text: 'Text Button',
      link: '',
      color: '#fff',
      padding: '10px 20px 10px 20px',
      backgroundColor: '#3aaee0',
      hoverColor: '#FFF',
      hoverBackgroundColor: '#2a92bf',
      textAlign: "center",
      lineHeight: 120,
      borderRadius: 4,
      containerPadding: '10px',
      lineStyle: 'solid',
      lineWidth: 0,
      lineColor: '#3aaee0',
    };
  }

  getProperties(values, update) {
    const { color, linkType, link, backgroundColor, hoverColor, hoverBackgroundColor,
      containerPadding, padding, textAlign, lineHeight, borderRadius,
      lineStyle, lineWidth, lineColor } = values;
    return <React.Fragment>
      <Group title="LINK">
        <Link link={link} linkType={linkType} title="Button Link" onUpdate={update} />
      </Group>
      <Group title="COLORS">
        <Colors title="Colors" colors={{
          color,
          backgroundColor,
          hoverColor,
          hoverBackgroundColor
        }} onUpdate={update} />
      </Group>
      <Group title="SPACING">
        <Align align={textAlign} onUpdate={update} />
        <LineHeight lineHeight={lineHeight} onUpdate={update} />
        <Line title="Border" lineWidth={lineWidth} lineStyle={lineStyle} lineColor={lineColor} onUpdate={update} />
        <BorderRadius borderRadius={borderRadius} onUpdate={update} />
        <Space title="Padding" value={padding} attribute="padding" onUpdate={update} />
      </Group>
      <Group title="GENERAL">
        <Space title="Container Padding" value={containerPadding} attribute="containerPadding" onUpdate={update} />
      </Group>
    </React.Fragment>;
  }

  render() {
    const { focus, text, color, padding, backgroundColor, containerPadding,
      textAlign, lineHeight, borderRadius,
      lineStyle, lineWidth, lineColor, onUpdate } = this.props;
    return <div className="ds_content_button">
      <div style={{
        textAlign: textAlign,
        padding: containerPadding,
      }}>
        <a className="mce-content-wrapper"
          style={{
            color,
            backgroundColor,
            padding,
            lineHeight: `${lineHeight}%`,
            borderRadius: `${borderRadius}px`,
            border: `${lineWidth}px ${lineStyle} ${lineColor}`
          }}
        >
          <TinyMce value={text} focus={focus} onChange={onUpdate}>
            <p />
          </TinyMce>
        </a>
      </div>
    </div>;
  }
}

interface IButtonProps {
  linkType?: string;
  text?: string;
  link?: string;
  color?: string;
  padding?: string;
  backgroundColor?: string;
  hoverColor?: string;
  hoverBackgroundColor?: string;
  textAlign?: TextAlgin;
  lineHeight?: number;
  borderRadius?: number;
  containerPadding?: string;
  lineStyle?: string;
  lineWidth?: number;
  lineColor?: string;
}

export default Button;