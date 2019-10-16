import * as React from 'react';
import { createPortal } from 'react-dom';

class Portal extends React.Component<IPortalProps, {}> {

  container: HTMLDivElement;

  componentDidMount() {
    this.createContainer();
  }

  componentDidUpdate(prevProps: IPortalProps) {
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
      this.container = this.props.getContainer();
    } else {
      this.container = this.getContainer();
    }
    this.forceUpdate();
  }

  getContainer = () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    return container;
  }

  removeContainer() {
    if (this.container) {
      this.container.parentNode.removeChild(this.container);
    }
  }

  render() {
    if (this.container) {
      return createPortal(this.props.children, this.container);
    }
    return null;
  }
}

interface IPortalProps {
  getContainer?: Function;
  didUpdate?: Function;
}

export default Portal;