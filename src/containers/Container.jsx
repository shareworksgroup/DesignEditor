import React from 'react';
import { Provider } from 'mobx-react';
import rootStore from '@store/store';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import SideBar from './SideBar';
import Main from './Main';
import Extension from './extension/Extension';
import styles from '../style/index.less';
import { Button, Divider, Html, Image, Text } from './extension';

window.rootStore = rootStore;
class Container extends React.Component {
  componentDidMount() {
    const { children } = this.props;
    [Button, Divider, Html, Image, Text].forEach(Content => {
      Content.type = new Content().getContentType();
      rootStore.DesignState.addExtension(Content)
    });
    React.Children.forEach(children, Child => {
      if (Child) {
        Child.type.type = new Child.type().getContentType();
        rootStore.DesignState.addExtension(Child.type);
      }
    });
  }

  render(){
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

export default Container;
