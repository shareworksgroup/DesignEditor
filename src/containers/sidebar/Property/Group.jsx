import React from 'react';

class Group extends React.Component {

  state = {
    height: -1,
    expand: true,
  }

  componentDidMount() {
    if (this.contentDom) {
      this.bodyHeight = this.contentDom.getBoundingClientRect().height;
      this.setState({ height: this.bodyHeight });
    }
  }

  toggle = () => {
    if (this.state.expand) {
      this.setState({ height: 0, expand: false });
    } else {
      this.setState({ height: this.bodyHeight, expand: true });
    }
  }

  render() {
    const { title, children } = this.props;
    const bodyStyle = this.state.height >= 0 ? { height: this.state.height } : {};
    return <div className="card">
      <div className="card-header" onClick={this.toggle}>
        <div className="row">
          <div className="col-10"><span>{title}</span></div>
          <div className="col-2 header-expand-icon">
            <i className={this.state.expand ? "mdi-navigation-expand-less" : "mdi-navigation-expand-more"}></i>
          </div>
        </div>
      </div>
      <div className="collapse show" style={bodyStyle} ref={dom => { this.contentDom = dom; }}>
        <div className="card-body">
          {children}
        </div>
      </div>
    </div>
  }
}


export default Group;