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
import { dynamicList } from '../../lib/util';
import AutoComplete from '../../lib/autocomplete';
import Group from '../sidebar/Property/Group';
import { Input, Number, AutoCompletePanel } from '../../components';
import { Link, Colors, Align, LineHeight,BorderRadius, Color, Space } from '../sidebar/Property/items';

class Button extends Extension {

  state={
    showDynamic: false,
    query:'',
    data: dynamicList,
    position: { x: 0, y:0 },
  }

  getIconClass() {
    return 'mdi-image-crop-7-5';
  }

  getContentType() {
    return ContentType.BUTTON;
  }

  getLabel() {
    return 'Button';
  }

  componentDidMount() {
    this.autoComplete = new AutoComplete();
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
    if (editor && this.autoComplete) {
      this.editor = editor.editor;
      this.autoComplete.on(editor.editor, /^.*#([^#]*)$/, (result) => {
        if (result.match) {
          this.setState({
            showDynamic: true,
            position: result.position,
            query: result.query,
            data: dynamicList.filter(item => item.key.indexOf(result.query) !== -1)
          });
        } else {
          this.setState({ showDynamic: false, query: '' });
        }
      });
    }
  }

  handleEditorChange = (value) => {
    const { onUpdate } = this.props;
    onUpdate('text', value.target.getContent({format: 'raw'}));
  }

  insertDynamic = (value) => {
    if (this.editor) {
      Array(this.state.query.length + 1).fill().forEach(i => {
        this.editor.execCommand('delete');
      });
      this.editor.insertContent('[['+value.key + ']]', {merge :true});
      this.setState({ showDynamic: false, query: '' });
    }
  }

  //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
  componentWillReceiveProps({ color, focus, padding, backgroundColor, textAlign, lineHeight, borderRadius  }) {
    if (this.editor) {
      if (!focus) {
        this.autoComplete.off();
      }
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
    const { focus, text, color, padding, backgroundColor, containerPadding, hoverColor, textAlign, lineHeight, borderRadius } = this.props;
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
      <AutoCompletePanel
        data={this.state.data}
        show={this.state.showDynamic}
        position={this.state.position}
        onClick={(item) => { this.insertDynamic(item); }}
        onClose={() => {this.setState({ showDynamic: false, query: '' })}}
      />
    </div>;
  }
}

export default Button;