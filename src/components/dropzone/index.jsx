import React from 'react';
import classnames from 'classnames';
import Dropzone from 'dropzone';
import dzstyle from 'dropzone/dist/dropzone.css';
import styles from './index.less';

const defaults = {
  autoProcessQueue: true,
  maxFilesize: 10,
  addRemoveLinks: true,
  addRetryLinks: true,
  maxFiles: 1000,
};

class DropZone extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.dom) {
      const props = this.props;
      Dropzone.autoDiscover = false;
      this.dropzone = new Dropzone(this.dom, {
        ...defaults,
        ...props
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  componentWillUnmout(){
    this.dropzone = null;
  }

  render() {
    const { className, style, needShell = false } = this.props;
    if (needShell) {
      return <div ref={(dom) => {this.dom = dom;}} class={classnames('dropzone', className)} style={style}></div>;
    }
    return <a ref={(dom) => {this.dom = dom;}} class={classnames(className)} style={style}></a>;
  }
}



export default DropZone;