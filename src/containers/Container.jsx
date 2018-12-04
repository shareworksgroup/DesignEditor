import React from 'react';
import SideBar from './SideBar';
import Main from './Main';

class Container extends React.Component {
  render(){
    return <div className="ds_container">
      <Main></Main>
      <SideBar></SideBar>
    </div>;
  }
}

export default Container;