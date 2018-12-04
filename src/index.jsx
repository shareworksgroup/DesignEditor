import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'mobx-react';
import rootStore from '@store/store';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Container from './containers/Container';
import styles from './style/index.less';

window.rootStore = rootStore;
ReactDom.render(<Provider rootStore={rootStore}>
  <DragDropContextProvider backend={HTML5Backend}>
    <Container />
  </DragDropContextProvider>
</Provider>, document.getElementById('root'));