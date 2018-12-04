import React from 'react';
import classnames from 'classnames';
import Content from './Content';
import Row from './Row';

class SideBar extends React.Component {
  state={
    active: 0
  }
  render(){
    return <div className="ds_sidebar">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a onClick={()=>{this.setState({ active: 0 })}} className={classnames("nav-link", this.state.active === 0 && "active")}><i className="mdi-action-dashboard icon"/>Content</a>
        </li>
        <li className="nav-item">
          <a onClick={()=>{this.setState({ active: 1 })}} className={classnames("nav-link", this.state.active === 1 && "active")}><i className="mdi-action-view-headline icon"/>Row</a>
        </li>
        <li className="nav-item">
          <a onClick={()=>{this.setState({ active: 2 })}} className={classnames("nav-link", this.state.active === 2 && "active")}><i className="mdi-action-payment icon"/>Body</a>
        </li>
      </ul>
      <div>
        { this.state.active === 0 && <div><Content /></div>}
        { this.state.active === 1 && <div><Row /></div>}
        { this.state.active === 2 && <div>body</div>}
      </div>
    </div>;
  }
}

export default SideBar;