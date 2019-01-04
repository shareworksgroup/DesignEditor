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

const dynamicList = [
  { key: 'wostatus', title: 'wostatus' },
  { key: 'wonum', title: 'wonum' },
  { key: 'author', title: 'author' },
  { key: 'date', title: 'date' },
];

class Text extends Extension {

  state={
    text: 'I am text.',
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

  handleEditorChange = (value) => {
    
    this.setState({ text: value.target.getContent({format: 'raw'}) });
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

  render(){
    const { focus = false } = this.props;
    console.log('render', this.state.text)
    return <div className="ds_content_text">
      <div >
        { focus ? 
        <Editor
          ref={this.onRef}
          initialValue={this.state.text}
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
        : <p  dangerouslySetInnerHTML={{__html: this.state.text }}></p>}
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