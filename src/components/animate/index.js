import React, { Component } from 'react';
import Animation from './animations';

class Animate extends Component {
  componentDidMount() {
    if (this.container) {
      Animation.init(this.container);
      Animation[this.props.type].run();
    }
  }

  shouldComponentUpdate(nextProps) {
    return this.props.type !== nextProps.type
        || this.props.visible !== nextProps.visible;
  }

  componentDidUpdate() {
    // Animation[this.props.type].run();
  }

  componentWillUnmount() {
    Animation.destory();
  }
  // 578px 143px
  render() {
    const { width, height } = this.props;
    return (
      <div style={{ width, height }} ref={(ref) => { this.container = ref; }} />
    );
  }
}
export default Animate;