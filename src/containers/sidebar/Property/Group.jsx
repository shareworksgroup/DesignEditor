import React from 'react';

class Group extends React.Component {
  render(){
    const { title, children } = this.props;
    return <div className="card">
      <div className="card-header">
        <div className="row">
          <div className="col-10"><span>{title}</span></div>
          <div className="col-2 header-expand-icon">
            <i className="mdi-navigation-expand-less"></i>
          </div>
        </div>
      </div>
      <div className="collapse show">
        <div className="card-body">
          {children}
        </div>
      </div>
    </div>
  }
}


export default Group;