import React from 'react';
import AnimateHeight from 'react-animate-height';

class Group extends React.Component<IGroupProps, IGroupState> {

  state: IGroupState = {
    height: 'auto',
    expand: true,
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
    return <div className="card">
      <div className="card-header" onClick={this.toggle}>
        <div className="row">
          <div className="col-10"><span>{title}</span></div>
          <div className="col-2 header-expand-icon">
            <i className={this.state.expand ? "icon icon-up" : "icon icon-down"}></i>
          </div>
        </div>
      </div>
      <AnimateHeight
        className="collapse show"
        height={ this.state.height }
      >
        <div className="card-body">
          {children}
        </div>
      </AnimateHeight>
    </div>;
  }
}

interface IGroupProps {
  title?: string;
}

interface IGroupState {
  height: 'auto' | number;
  expand: boolean;
}


export default Group;