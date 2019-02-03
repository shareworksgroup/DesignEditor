import React from 'react';

import Extension from './Extension';
import { ContentType, Fonts } from '../../lib/enum';
import { Config } from '../../lib/util';
import AutoComplete from '../../lib/autocomplete';
import Group from '../sidebar/Property/Group';
import { AutoCompletePanel } from '../../components';
import { Align, LineHeight, BorderRadius, Color, Space } from '../sidebar/Property/items';
import './lib/tinymce.min.js';


class Text extends Extension {

  state = {
    showDynamic: false,
    query: '',
    data: [],
    position: { x: 0, y: 0 },
  }

  getIconClass() {
    return 'icon icon-text';
  }

  getContentType() {
    return ContentType.TEXT
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

  getInitialAttribute() {
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

  handleEditorChange = (value) => {
    const { onUpdate } = this.props;
    const content = value.target.getContent({ format: 'raw' });
    onUpdate('text', content);
  }

  componentDidMount() {
    this.autoComplete = new AutoComplete();
    
  }

  initEditor = () => {
    tinymce.init({
      target: this.dom,
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
      fontsize_formats: '8px 10px 12px 14px 16px 18px 20px 24px 26px 28px 30px 36px 40px 44px 48px 60px 72px',
      setup: (ed) => {
        this.editor = ed;
        this.onRef(ed);
        ed.on('keydown', (e) => {
          if (e.keyCode === 13) {
            this.state.showDynamic && e.preventDefault();
          }
        })
      },
    });
  }

  onRef = (editor) => {
    if (editor && this.autoComplete) {
      this.autoComplete.on(editor, /^.*#([^#]*)$/, (result) => {
        if (result.match) {
          this.setState({
            showDynamic: true,
            position: result.position,
            query: result.query,
            data: Config.get('mentions').filter(item => item.key.indexOf(result.query) !== -1)
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
      this.editor.insertContent('[[' + value.key + ']]', { merge: true });
      this.setState({ showDynamic: false, query: '' });
    }
  }

  componentWillReceiveProps({ textAlign, lineHeight, color, focus, _meta }) {

    if (!focus) {
      this.autoComplete.off();
      this.editor && this.handleEditorChange({ target: this.editor });
      this.editor && this.editor.remove(this.dom);
      this.editor = null;
    } else {
      !this.editor && this.initEditor();
    }
  }

  componentWillUnmount(){
    super.componentWillUnmount();
    if (this.autoComplete) {
      this.autoComplete.off();
    }
  }

  render() {
    const { focus = false, text, textAlign, lineHeight, containerPadding, color, _meta } = this.props;
    return <div className="ds_content_text">
      <div id={`id_${_meta.guid}`} style={{
        textAlign,
        color,
        lineHeight: lineHeight + '%',
        padding: containerPadding,
      }}>
        <div ref={(dom) => {this.dom = dom;}} dangerouslySetInnerHTML={{ __html: text }}></div>
      </div>
      <AutoCompletePanel
        data={this.state.data}
        show={this.state.showDynamic}
        position={this.state.position}
        onClick={(item) => { this.insertDynamic(item); }}
        onClose={() => { this.setState({ showDynamic: false, query: '' }) }}
      />
    </div>
  }
}

export default Text;