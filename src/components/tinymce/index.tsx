import React from 'react';
import AutoComplete from './autocomplete';
import AutoCompletePanel from '../form/AutoCompletePanel';
import Portal from '../portal';
import { Config } from '../../lib/util';
import tinymce from 'tinymce';

const fn = () => { };

interface IEditorProps {
  value?: string;
  focus?: boolean;
  preventEnter?: boolean;
  setup?: (editor: any) => void;
  onChange?: (editor: any) => void;
  onRef?: (editor: any) => void;
  config?: IKeyValueMap;
}
class Editor extends React.Component<IEditorProps> {

  editor: any;
  dom: any;
  currentContent: any;

  componentDidUpdate({ focus }) {
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

  onRef = dom => {
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
      setup: ed => {
        this.editor = ed;
        setup(this.editor);
        onRef(this.editor);
        ed.on('keydown', e => {
          if (e.keyCode === 13 && self.props.preventEnter) {
            e.preventDefault();
          }
        });
        ed.on('change', e => {
          self.currentContent = self.editor.getContent({ format: 'raw' });
          onChange(self.editor);
        });
      }
    }, config);
    tinymce.init(options);
  }

  render() {
    const { children, value } = this.props;
    if (React.Children.count(children) > 1) {
      throw new Error('Tinymce children must be single');
    }
    return React.cloneElement(children as React.ReactElement<any>,
      {
        ref: this.onRef,
        dangerouslySetInnerHTML: { __html: value }
      });
  }
}

interface ITinyMceProps {
  focus?: boolean;
  value?: string;
  autoComplete?: boolean;
  config?: IKeyValueMap;
  onChange?: (type: string, content: string) => void;
  getContainer?: () => HTMLDivElement;
}

class TinyMce extends React.Component<ITinyMceProps> {

  _isMounted = false;
  autoComplete: AutoComplete;
  editor: any;

  state = {
    showDynamic: false,
    query: '',
    data: [],
    position: { x: 0, y: 0 },
  }

  componentDidMount() {
    this.autoComplete = new AutoComplete();
    this._isMounted = true;
  }

  componentDidUpdate({ focus }) {
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

  handleEditorChange = editor => {
    const { onChange } = this.props;
    const content = editor.getContent({ format: 'raw' });
    const regex = /(<([^>]+)>)/ig;
    const pureContent = content.replace(regex, "");
    onChange('text', pureContent ? content : "");
  }

  insertDynamic = value => {
    if (this.editor) {
      Array(this.state.query.length + 1).fill(0).forEach(i => {
        this.editor.execCommand('delete');
      });
      this.editor.insertContent(`[[${value.key}]]`, { merge: true });
      this.setState({ showDynamic: false, query: '' });
    }
  }

  initAutoComplete = editor => {
    if (editor && this.autoComplete) {
      this.autoComplete.on(editor, /^.*#([^#]*)$/, result => {
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

  render() {
    const { children, value, autoComplete = true, focus = false, config = {} } = this.props;
    if (React.Children.count(children) !== 1) {
      throw new Error('TinyMce need one child component to initialize content');
    }

    return <React.Fragment>
      <Editor
        config={config}
        value={value}
        preventEnter={this.state.showDynamic}
        onRef={editor => { this.editor = editor; }}
        onChange={this.handleEditorChange} focus={focus} setup={this.initAutoComplete}>
        {children}
      </Editor>
      <Portal getContainer={this.getContainer}>
        <AutoCompletePanel
          data={this.state.data}
          show={this.state.showDynamic}
          position={this.state.position}
          onClick={item => { this.insertDynamic(item); }}
          onClose={() => { this._isMounted && this.setState({ showDynamic: false, query: '' }); }}
        />
      </Portal>
    </React.Fragment>;
  }
}

export default TinyMce;