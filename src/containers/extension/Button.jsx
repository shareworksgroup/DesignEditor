import React from 'react';
import tinymce from 'tinymce/tinymce';
import 'tinymce/themes/modern/theme';

import 'tinymce/plugins/link';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/textcolor';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/contextmenu';

import { Editor } from '@tinymce/tinymce-react';
import classnames from 'classnames';
import Extension from './Extension';
import { ContentType } from '../../lib/enum';
import Group from '../sidebar/Property/Group';
import { Input, Number } from '../../components';
import { Link, Colors, Align, LineHeight,BorderRadius, Color, Space } from '../sidebar/Property/items';

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

  toHtml(data){
    const { text, color, link, linkType, padding, backgroundColor, containerPadding, hoverColor, textAlign, lineHeight, borderRadius, _meta } = data;
    return `<div>
      <div style="text-align:${textAlign};padding:${containerPadding}">
      <style>
        #button_${_meta.guid}:hover{
          background-color:${hoverColor} !important;
        }
      </style>
      <a target="${linkType}" href="${link}" id="button_${_meta.guid}" style="text-decoration: none;cursor:pointer;color:${color};background-color:${backgroundColor};padding:${padding};line-height:${lineHeight}%;border-radius:${borderRadius}px;">${text}</a>
      </div>
    </div>`;
  }

  getInitialAttribute(){
    return {
      linkType: '_self',
      text:'Text Button',
      link: '',
      color: '#fff',
      padding: '10px 20px 10px 20px',
      backgroundColor: '#3aaee0',
      hoverColor: '#2a92bf',
      textAlign: 'center',
      lineHeight: 120,
      borderRadius: 4, 
      containerPadding: '10px',
    };
  }

  getProperties(values, update) {
    const { color, linkType, link, backgroundColor, hoverColor, containerPadding, padding, textAlign, lineHeight, borderRadius } = values;
    return <React.Fragment>
      <Group title="LINK">
        <Link link={link} linkType={linkType} title="Button Link" onUpdate={update}/>
      </Group>
      <Group title="COLORS">
        <Colors title="Colors" colors={{
          color,
          backgroundColor,
          hoverColor
        }} onUpdate={update} />
      </Group>
      <Group title="SPACING">
        <Align align={textAlign} onUpdate={update} />
        <LineHeight lineHeight={lineHeight} onUpdate={update} />
        <BorderRadius borderRadius={borderRadius} onUpdate={update} />
        <Space title="Padding" value={padding} attribute="padding" onUpdate={update}/>
      </Group>
      <Group title="GENERAL">
        <Space title="Container Padding" value={containerPadding} attribute="containerPadding" onUpdate={update}/>
      </Group>
    </React.Fragment>
  }

  
  onRef = (editor) => {
    if (editor) {
      this.editor = editor.editor;
        this.editor.on('Input', () => {
          if (this.editor) {
            const position = this.editor.selection.getRng().endOffset;
            if (position > 0) {
              const text = this.editor.selection.getSel().anchorNode.data;
              if(text.substr(position-1, 1) === '#') {
                const rect = this.editor.selection.getBoundingClientRect();
                this.setState({ showDynamic: true, x: rect.left, y: rect.top });
              }
            }
          }
        });
      window.editor = editor.editor;
    }
  }

  handleEditorChange = (value) => {
    const { onUpdate } = this.props;
    onUpdate('text', value.target.getContent({format: 'raw'}));
  }

  //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
  componentWillReceiveProps({ color, padding, backgroundColor, textAlign, lineHeight, borderRadius  }) {
    if (this.editor) {
      const body = this.editor.getBody();
      if (!body) {
        return;
      }
      body.style.color = color;
      body.style.padding = padding;
      body.style.backgroundColor = backgroundColor;
      body.style.textAlign = textAlign;
      body.style.borderRadius = borderRadius + 'px';
      body.style.lineHeight = lineHeight+'%';
      body.style.textAlign = textAlign;
    }
  }

  render() {
    const { text, color, padding, backgroundColor, containerPadding, hoverColor, textAlign, lineHeight, borderRadius } = this.props;
    return <div className="ds_content_button">
      <div style={{
        textAlign: textAlign,
        padding: containerPadding,
      }}>
        { focus ? 
        <Editor
          tagName="a"
          ref={this.onRef}
          initialValue={text}
          init={{
            menubar: false,
            toolbar: ['fontselect fontsizeselect | bold italic underline' ],
            inline: true,
          }}
          onChange={this.handleEditorChange}
        />
        : <a className="editable" style={{
          color,
          backgroundColor,
          padding,
          lineHeight: lineHeight+'%',
          borderRadius: borderRadius+'px'
        }}>
          {text}
        </a>}
      </div>
    </div>;
  }
}

export default Button;