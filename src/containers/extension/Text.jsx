import React from 'react';
import tinymce from 'tinymce/tinymce';
import 'tinymce/themes/modern/theme';

import 'tinymce/plugins/link';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/textcolor';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/colorpicker';

import { Editor } from '@tinymce/tinymce-react';
import Extension from './Extension';
import { ContentType, Fonts } from '../../lib/enum';
import { dynamicList } from '../../lib/util';
import AutoComplete from '../../lib/autocomplete';
import Group from '../sidebar/Property/Group';
import { Input, Number, AutoCompletePanel } from '../../components';
import { Link, Colors, Align, LineHeight,BorderRadius, Color, Space } from '../sidebar/Property/items';



class Text extends Extension {

  state={
    showDynamic: false,
    query:'',
    data: dynamicList,
    position: { x: 0, y:0 },
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

  componentDidMount() {
    this.autoComplete = new AutoComplete();
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
  componentWillReceiveProps({ textAlign, lineHeight,  color, focus }) {
    if (this.editor) {
      if (!focus) {
        this.autoComplete.off();
      }
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
            'colorpicker',
            'lists',
            'autolink'],
            toolbar: ['undo redo | bold italic underline | fontselect fontsizeselect',
            'forecolor backcolor | alignleft aligncenter alignright alignfull | numlist bullist outdent indent | link unlink'],
            inline: true,
            font_formats: (() => Object.keys(Fonts).map(i => `${i}=${Fonts[i]}`).join(';'))(),
            fontsize_formats: '8pt 10pt 12pt 14pt 16pt 18pt 20pt 24pt 26pt 28pt 30pt 36pt 40pt 44pt 48pt 60pt 72pt'
          }}
          onChange={this.handleEditorChange}
        />
        : <p  dangerouslySetInnerHTML={{__html: text }}></p>}
      </div>
      <AutoCompletePanel
        data={this.state.data}
        show={this.state.showDynamic}
        position={this.state.position}
        onClick={(item) => { this.insertDynamic(item); }}
        onClose={() => {this.setState({ showDynamic: false, query: '' })}}
      />
    </div>
  }
}

export default Text;