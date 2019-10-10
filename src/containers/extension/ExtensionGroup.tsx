import React from 'react';
import rootStore from '../../store/store';
import { IExtensionProps, IExtension } from './Extension';

class ExtensionGroup extends React.Component<IExtensionGroupProps, IExtensionGroupStates> {

  componentDidMount() {
    this.initConfig();
  }

  initConfig() {
    const { children, title } = this.props;
    setTimeout(() => {
      React.Children.forEach<React.ReactElement<IExtensionProps, IExtension>>(children, child => {
        if (child) {
          const content = new child.type({}) as any as IExtension; // eslint-disable-line
          child.type.type = content.getContentType();
          child.type.group = title;
          rootStore.DesignState.addExtension(child.type);
          rootStore.DesignState.setAttribute(child.type.type, content.getInitialAttribute());
        }
      });
    });
  }

  render() {
    return null;
  }
}

export interface IExtensionGroupProps {
  children?: React.ReactElement<IExtensionProps, IExtension> | React.ReactElement<IExtensionProps, IExtension>[];
  rootStore?: any;
  title: string;
}
export interface IExtensionGroup<P=any> {
  new (props: any): React.Component<IExtensionGroupProps, any, any>;
}
interface IExtensionGroupStates {
}

export default ExtensionGroup;