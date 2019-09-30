import * as React from 'react';

export default class LazyRenderBox extends React.Component<ILazyRenderBoxProps, {}> {
  shouldComponentUpdate(nextProps: ILazyRenderBoxProps) {
    return !!nextProps.hiddenClassName || !!nextProps.visible;
  }
  render() {
    let className = this.props.className;
    if (!!this.props.hiddenClassName && !this.props.visible) {
      className += ` ${this.props.hiddenClassName}`;
    }
    const props = { ...this.props };
    delete props.hiddenClassName;
    delete props.visible;
    props.className = className;
    return <div {...props} />;
  }
}

interface ILazyRenderBoxProps {
  hiddenClassName?: string;
  visible?: boolean;
  className?: string;
  style?: Object;
  key?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}