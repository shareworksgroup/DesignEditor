import React from 'react';
import classnames from 'classnames';
import Extension from './Extension';
import { ContentType } from '../../lib/enum';
import Group from '../sidebar/Property/Group';
import { Input, Number } from '../../components';
import { Link, Color, Align, LineHeight,BorderRadius  } from '../sidebar/Property/items';

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

  getInitialAttribute(){
    return {
      linkType: '_self',
      text:'Text Button',
      link: 'http://www.baidu.com',
      textColor: '#fff',
      backgroundColor: '#3aaee0',
      hoverColor: '#2a92bf',
      textAlign: 'center',
      lineHeight: 120,
      borderRadius: 4
    };
  }

  getProperties(values, update) {
    const { textColor, linkType, link, backgroundColor, hoverColor, textAlign, lineHeight, borderRadius } = values;
    return <React.Fragment>
      <Group title="LINK">
        <Link link={link} linkType={linkType} title="Button Link" onUpdate={update}/>
      </Group>
      <Group title="COLORS">
        <Color title="Colors" colors={{
          textColor,
          backgroundColor,
          hoverColor
        }} onUpdate={update} />
      </Group>
      <Group title="SPACING">
        <Align align={textAlign} onUpdate={update} />
        <LineHeight lineHeight={lineHeight} onUpdate={update} />
        <BorderRadius borderRadius={borderRadius} onUpdate={update} />
      </Group>
    </React.Fragment>
  }

  render() {
    const { text, textColor, backgroundColor, hoverColor, textAlign, lineHeight, borderRadius } = this.props;
    return <div className="ds_content_button">
      <div style={{
        textAlign: textAlign
      }}>
        <a className="editable" style={{
          color: textColor,
          backgroundColor: backgroundColor,
          lineHeight: lineHeight+'%',
          borderRadius: borderRadius+'px'
        }}>
          {text || "Button Text"}
        </a>
      </div>
    </div>;
  }
}

export default Button;