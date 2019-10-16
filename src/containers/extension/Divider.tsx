import React from 'react';
import Extension from './Extension';
import { ContentType } from '../../lib/enum';
import Group from '../sidebar/Property/Group';
import { Align, Slide, Space, Line } from '../sidebar/Property/items';

class Divider extends Extension<IDividerProps> {
  getIconClass() {
    return 'icon icon-divider';
  }

  getContentType() {
    return ContentType.DIVIDER;
  }

  getLabel() {
    return 'Divider';
  }

  toHtml(data) {
    const { width, lineStyle, lineWidth, lineColor, textAlign, containerPadding } = data;
    return `<div>
      <div style="padding:${containerPadding};text-align:${textAlign};font-size:0">
        <div style="border-top:${lineWidth}px ${lineStyle} ${lineColor};width: ${width}%;display:inline-block;"></div>
      </div>
    </div>`;
  }

  getInitialAttribute(): IDividerProps {
    return {
      width: 100,
      lineStyle: 'solid',
      lineWidth: 1,
      lineColor: '#ccc',
      textAlign: 'center',
      containerPadding: '10px'
    };
  }

  getProperties(values, update) {
    const { width, lineStyle, lineWidth, lineColor, textAlign, containerPadding } = values;
    return <React.Fragment>
      <Group title="LINE">
        <Slide title="Width" attribute="width" value={width} onUpdate={update} />
        <Line title="Line" lineWidth={lineWidth} lineStyle={lineStyle} lineColor={lineColor} onUpdate={update} />
        <Align align={textAlign} onUpdate={update} />
      </Group>
      <Group title="GENERAL">
        <Space title="Container Padding" value={containerPadding} attribute="containerPadding" onUpdate={update} />
      </Group>
    </React.Fragment>;
  }

  render() {
    const { width, lineStyle, lineWidth, lineColor, textAlign, containerPadding } = this.props;
    return <div className="ds_content_divider">
      <div className="ds_content_divider_container" style={{
        padding: containerPadding,
        textAlign,
      }}>
        <div
          style={{
            borderTop: `${lineWidth}px ${lineStyle} ${lineColor}`,
            width: `${width}%`,
          }}
        ></div>
      </div>
    </div>;
  }
}

interface IDividerProps {
  width: number;
  lineStyle: string;
  lineWidth: number;
  lineColor: string;
  textAlign: TextAlgin;
  containerPadding: string
}

export default Divider;