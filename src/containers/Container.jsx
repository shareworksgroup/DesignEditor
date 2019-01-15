import React from 'react';
import { Provider } from 'mobx-react';
import rootStore from '../store/store';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import SideBar from './SideBar';
import Main from './Main';
import styles from '../style/index.less';
import { Button, Divider, Html, Image, Text } from './extension';
import Transform from '../lib/transform';
import { Config } from '../lib/util';


window.rootStore = rootStore;
@DragDropContext(HTML5Backend)
class DesignEditor extends React.Component {

  componentDidMount() {
    this.initConfig();
  }

  componentWillReceiveProps({ mentions }, nextState){
    if (mentions && JSON.stringify(Config.get('mentions')) !== JSON.stringify(mentions)) {
      Config.set('mentions', mentions);
    }
  }
  
  initConfig(){
    const { children, imageUploadUrl, onUpload, onUploadError, mentions } = this.props;
    Config.set('imageUploadUrl', imageUploadUrl);
    onUpload && Config.set('onUpload', onUpload);
    onUploadError && Config.set('onUploadError', onUploadError);
    mentions && Config.set('mentions', mentions);
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
      <div className="ds_container">
        <Main></Main>
        <SideBar></SideBar>
      </div>
  </Provider>;
  }
}

export default DesignEditor;
