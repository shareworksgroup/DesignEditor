import React from 'react';
import { createPortal } from 'react-dom';


class Portal extends React.Component {

  componentDidMount() {
    this.createContainer();
  }

  componentDidUpdate(prevProps) {
    const { didUpdate } = this.props;
    if (didUpdate) {
      didUpdate(prevProps);
    }
  }

  componentWillUnmount() {
    this.removeContainer();
  }

  createContainer() {
    if (this.props.getContainer) {
      this._container = this.props.getContainer();
    } else {
      this._container = this.getContainer();
    }
    this.forceUpdate();
  }

  getContainer = () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    return container;
  }

  removeContainer() {
    if (this._container) {
      this._container.parentNode.removeChild(this._container);
    }
  }

  render() {
    if (this._container) {
      return createPortal(this.props.children, this._container);
    }
    return null;
  }
}

export default Portal;