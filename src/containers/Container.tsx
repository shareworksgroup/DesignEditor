import React from 'react';
import { Provider } from 'mobx-react';
import rootStore from '../store/store';
import '../style/index.less';
import { Button, Divider, Html, Image, Text, Social } from './extension';
import Transform from '../lib/transform';
import { Config } from '../lib/util';
import Wrapper from './Wrapper';
import { IExtensionProps, IExtension } from './extension/Extension';
import { IExtensionGroupProps, IExtensionGroup } from './extension/ExtensionGroup';
import { UndoRedoApi } from '../lib/history';


(window as any).rootStore = rootStore;

class DesignEditor extends React.Component<IDesignEditorProps> {

  componentDidMount() {
    const { onRef = () => { } } = this.props;
    this.initConfig();
    onRef({
      export: this.export,
      getData: this.getData,
      setData: this.setData,
      undo: UndoRedoApi.undo,
      redo: UndoRedoApi.redo
    });
    window.addEventListener('keydown', this.bindShortKey);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.bindShortKey);
  }

  bindShortKey = (e: KeyboardEvent) => {
    if (e.keyCode === 46 || (e.metaKey && e.keyCode === 8)) rootStore.DesignState.deleteSelected();
  }

  componentWillReceiveProps(nextProps, nextState) {
    const { mentions } = nextProps;
    if (mentions && JSON.stringify(Config.get('mentions')) !== JSON.stringify(mentions)) {
      Config.set('mentions', mentions);
    }
  }

  initConfig() {
    const { children, imageUploadUrl, onUpload, onUploadError, mentions, contents, enableUndoRedo = true } = this.props;
    Config.set('imageUploadUrl', imageUploadUrl);
    Config.set('enableUndoRedo', enableUndoRedo);
    onUpload && Config.set('onUpload', onUpload);
    onUploadError && Config.set('onUploadError', onUploadError);
    mentions && Config.set('mentions', mentions);
    contents && Config.set('contents', contents);
    [Button, Divider, Html, Image, Text, Social].forEach((Content: React.ComponentClass<IExtensionProps>) => {
      const content = new Content({}) as any as IExtension;
      const contentType = content.getContentType();
      (Content as any as IExtension).type = contentType;
      (Content as any as IExtension).group = 'General';
      if (Config.get('contents').some(type => type === contentType)) {
        rootStore.DesignState.addExtension((Content as any as IExtension));
        rootStore.DesignState.setAttribute(contentType, content.getInitialAttribute());
      }
    });
    React.Children.forEach<React.ReactElement<IExtensionGroupProps, IExtensionGroup>>(children, child => {
      if (child) {
        rootStore.DesignState.addExtensionGroup(child.props.title);
      }
    });
  }

  export = () => {
    const rawData = this.getData();
    const transform = new Transform(rawData, rootStore.DesignState.getExtensions());
    return transform.toHtml();
  }

  getData = () => {
    return rootStore.DesignState.getData();
  }

  setData = json => {
    rootStore.DesignState.execCommand('setData', json);
  }

  render() {
    return <Provider rootStore={rootStore}>
      <div><Wrapper />{this.props.children}</div>
    </Provider>;
  }
}

interface IApi {
  export: () => void;
  getData: () => IKeyValueMap;
  setData: (json: IKeyValueMap) => void;
  undo: () => void;
  redo: () => void;
}

interface IDesignEditorProps {
  children?: React.ReactElement<IExtensionGroupProps, IExtensionGroup> | React.ReactElement<IExtensionGroupProps, IExtensionGroup>[];
  onRef?: (api: IApi) => void;
  mentions?: any;
  contents?: any;
  enableUndoRedo?: boolean;
  imageUploadUrl?: string;
  onUpload?: (data: IKeyValueMap) => string;
  onUploadError?: (error: Error) => void;
}

export default DesignEditor;
