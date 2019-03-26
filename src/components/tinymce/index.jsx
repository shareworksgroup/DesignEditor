import React from 'react';
import AutoComplete from './autocomplete';
import AutoCompletePanel from '../form/AutoCompletePanel';
import Portal from '../portal';
import { Config } from '../../lib/util';
import './tinymce.min.js';

const fn = () => {};

class Editor extends React.Component {

  componentDidUpdate({ focus }){
    if (this.props.focus === focus) {
      return;
    }
    if (!this.props.focus) {
      this.editor && this.editor.remove(this.dom);
      this.editor = null;
    } else {
      !this.editor && this.initEditor();
    }
  }

  shouldComponentUpdate({ value, focus }) {
    if (focus !== this.props.focus || !this.props.focus) {
      return true;
    }
    if (value !== this.currentContent) {
      return true;
    }
    return false;
  }

  onRef = (dom) => {
    this.dom = dom;
  }

  initEditor = () => {
    const { setup = fn, onChange = fn, onRef = fn, config = {} } = this.props;
    const self = this;
    const options = Object.assign({
      target: this.dom,
      menubar: false,
      inline: true,
      toolbar: ['fontselect fontsizeselect | bold italic underline'],
      setup: (ed) => {
        this.editor = ed;
        setup(this.editor);
        onRef(this.editor);
        ed.on('keydown', (e) => {
          if (e.keyCode === 13) {
            e.preventDefault();
          }
        });
        ed.on('change', (e) => {
          self.currentContent = self.editor.getContent({ format: 'raw' });
          onChange(self.editor);
        });
      }
    }, config)
    tinymce.init(options);
  }

  render(){
    const { children, value } = this.props;
    const node = React.cloneElement(children, 
      {
        ref: this.onRef,
        dangerouslySetInnerHTML: { __html: value }
      }
    );
    return node;
  }
}

class TinyMce extends React.Component {

  _isMounted = false; b

  state = {
    showDynamic: false,
    query: '',
    data: [],
    position: { x: 0, y: 0 },
  }

  componentDidMount(){
    this.autoComplete = new AutoComplete();
    this._isMounted = true;
  }

  componentDidUpdate({ focus }){
    if (!this.props.focus) {
      this.autoComplete.off();
    }
  }

  componentWillUnmount() {
    if (this.autoComplete) {
      this.autoComplete.off();
    }
    this._isMounted = false;
  }

  handleEditorChange = (editor) => {
    const { onChange } = this.props;
    let content = editor.getContent({ format: 'raw' });
    var regex = /(<([^>]+)>)/ig;
    const pureContent = content.replace(regex, "");
    onChange('text', pureContent ? content : "");
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

  initAutoComplete = (editor) => {
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
 
  getContainer = () => {
    const container = document.createElement('div');
    if (this.props.getContainer) {
      this.props.getContainer().appendChild(container);
    } else {
      document.body.appendChild(container);
    }
    return container;
  }

  render(){
    const { children, value, autoComplete = true, focus = false, config = {} } = this.props;
    if (React.Children.count(children) !== 1) {
      throw new Error('TinyMce need one child component to initialize content');
    }
    
    return <React.Fragment>
      <Editor
        config={config}
        value={value}
        onRef={(editor) => { this.editor = editor; }}
        onChange={this.handleEditorChange} focus={focus} setup={this.initAutoComplete}>
        {children}
      </Editor>
      <Portal getContainer={this.getContainer}>
        <AutoCompletePanel
          data={this.state.data}
          show={this.state.showDynamic}
          position={this.state.position}
          onClick={(item) => { this.insertDynamic(item); }}
          onClose={() => { this._isMounted && this.setState({ showDynamic: false, query: '' }) }}
        />
      </Portal>
    </React.Fragment>;
  }
}

export default TinyMce;