import React from 'react';
import tinymce from 'tinymce/tinymce';
import 'tinymce/themes/modern/theme';

import 'tinymce/plugins/link';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/textcolor';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/contextmenu';

import { Editor } from '@tinymce/tinymce-react';
import Extension from './Extension';
import { ContentType } from '../../lib/enum';
import Group from '../sidebar/Property/Group';
import { Input, Number } from '../../components';
import { Link, Colors, Align, LineHeight,BorderRadius, Color, Space } from '../sidebar/Property/items';


const dynamicList = [
  { key: 'wostatus', title: 'wostatus' },
  { key: 'wonum', title: 'wonum' },
  { key: 'author', title: 'author' },
  { key: 'date', title: 'date' },
];

class Text extends Extension {

  state={
    showDynamic: false
  }

  getIconClass(){
    return 'mdi-content-text-format';
  }

  getContentType(){
    return ContentType.TEXT;
  }

  getLabel(){
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

  getInitialAttribute(){
    return {
      color: '#000',
      text:'Hello World',
      textAlign: 'center',
      lineHeight: 120,
      padding: '5px 10px 10px 10px',
      containerPadding: '10px'
    };
  }

  getProperties(values, update){
    const { color, textAlign, lineHeight, containerPadding } = values;
    return <React.Fragment>
      <Group title="TEXT">
        <Color title="Color" value={color} attribute="color" onUpdate={update}/>
        <Align align={textAlign} onUpdate={update} />
        <LineHeight lineHeight={lineHeight} onUpdate={update} />
      </Group>
      <Group title="GENERAL">
        <Space title="Container Padding" value={containerPadding} attribute="containerPadding" onUpdate={update}/>
      </Group>
      </React.Fragment>;
  }

  handleEditorChange = (value) => {
    const { onUpdate } = this.props;
    onUpdate('text', value.target.getContent({format: 'raw'}));
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

  insertDynamic = (value) => {
    if (this.editor) {
      this.editor.execCommand('delete');
      this.editor.insertContent(' [['+value.key + ']] ', {merge :true});
      this.setState({ showDynamic: false });
    }
  }

  //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
  componentWillReceiveProps({ textAlign, lineHeight,  color }) {
    if (this.editor) {
      const body = this.editor.getBody();
      if (!body) {
        return;
      }
      body.style.color = color;
      body.style.lineHeight = lineHeight+'%';
      body.style.textAlign = textAlign;
    }
  }

  render(){
    const { focus = false, text, textAlign, lineHeight, containerPadding,  color } = this.props;
    return <div className="ds_content_text">
      <div style={{
        textAlign,
        color,
        lineHeight: lineHeight+'%',
        padding: containerPadding,
      }}>
        { focus ? 
        <Editor
          ref={this.onRef}
          initialValue={text}
          init={{
            menubar: false,
            plugins: [
            'link',
            'textcolor',
            'lists',
            'autolink'],
            toolbar: ['undo redo | bold italic underline | fontselect fontsizeselect',
            'forecolor backcolor | alignleft aligncenter alignright alignfull | numlist bullist outdent indent | link unlink'],
            inline: true,
          }}
          onChange={this.handleEditorChange}
        />
        : <p  dangerouslySetInnerHTML={{__html: text }}></p>}
      </div>
      {this.state.showDynamic && <div className="dynamic" style={{ left: this.state.x + 10, top: this.state.y + 40 }}>
        <ul>
          {dynamicList.map(i => (<li onClick={() => { this.insertDynamic(i); }} title={i.title}>{i.key}</li>))}
        </ul>
      </div>}
    </div>
  }
}

export default Text;