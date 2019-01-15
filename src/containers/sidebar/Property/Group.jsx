import React from 'react';
import AnimateHeight from 'react-animate-height';
class Group extends React.Component {

  state = {
    height: 'auto',
    expand: true,
  }

  componentDidMount() {
  }

  getContentHeight(){
  }

  toggle = () => {
    if (this.state.expand) {
      this.setState({ height: 0, expand: false });
    } else {
      this.setState({ height: 'auto', expand: true });
    }
  }

  render() {
    const { title, children } = this.props;
    const bodyStyle = this.state.maxHeight !== null ? { maxHeight: this.state.maxHeight } : {};
    return <div className="card">
      <div className="card-header" onClick={this.toggle}>
        <div className="row">
          <div className="col-10"><span>{title}</span></div>
          <div className="col-2 header-expand-icon">
            <i className={this.state.expand ? "mdi-navigation-expand-less" : "mdi-navigation-expand-more"}></i>
          </div>
        </div>
      </div>
      <AnimateHeight
        className="collapse show"
        height={ this.state.height } // see props documentation bellow
      >
        <div className="card-body">
          {children}
        </div>
      </AnimateHeight>
      
    </div>
  }
}


export default Group;