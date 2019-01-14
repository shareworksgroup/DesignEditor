import React from 'react';
import { Provider } from 'mobx-react';
import rootStore from '@store/store';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import SideBar from './SideBar';
import Main from './Main';
import Extension from './extension/Extension';
import * as ProperWidget from './sidebar/Property/items';
import styles from '../style/index.less';
import { Button, Divider, Html, Image, Text } from './extension';
import Transform from '../lib/transform';
import { Config } from '../lib/util';
import Group from './sidebar/Property/Group';


window.rootStore = rootStore;
class Container extends React.Component {
  componentDidMount() {
    this.initConfig();
  }

  initConfig(){
    const { children, imageUploadUrl, onUpload, onUploadError } = this.props;
    Config.set('imageUploadUrl', imageUploadUrl);
    onUpload && Config.set('onUpload', onUpload);
    onUploadError && Config.set('onUploadError', onUploadError);
    [Button, Divider, Html, Image, Text].forEach(Content => {
      const content = new Content();
      Content.type = content.getContentType();
      rootStore.DesignState.addExtension(Content)
      rootStore.DesignState.setAttribute(Content.type, content.getInitialAttribute());
    });
    React.Children.forEach(children, Child => {
      if (Child) {
        const content = new Child.type()
        Child.type.type = content.getContentType();
        rootStore.DesignState.addExtension(Child.type);
        rootStore.DesignState.setAttribute(Child.type.type, content.getInitialAttribute());
      }
    });
  }

  export(){
    const rawData = this.getData();
    const transform = new Transform(rawData, rootStore.DesignState.getExtensions());
    return transform.toHtml();
  }

  getData(){
    return rootStore.DesignState.getData();
  }

  setData(json){
    rootStore.DesignState.setData(json);
  }

  render(){
    const { onSave = () => {} } = this.props;
    return <Provider rootStore={rootStore}>
    <DragDropContextProvider backend={HTML5Backend}>
      <div className="ds_container">
        <Main></Main>
        <SideBar></SideBar>
      </div>
    </DragDropContextProvider>
  </Provider>;
  }
}

exports.Extension = Extension;

exports.PropertyWidget = ProperWidget;

exports.PropertyGroup = Group;

export default Container;
