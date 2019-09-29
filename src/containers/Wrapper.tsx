import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import SideBar from './SideBar';
import Main from './Main';

@DragDropContext(HTML5Backend)
class Wrapper extends React.Component {
  render() {
    return <div className="ds_container">
      <Main></Main>
      <SideBar></SideBar>
    </div>;
  }
}

export default Wrapper;