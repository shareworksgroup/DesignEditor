import React from 'react';
import classnames from 'classnames';
import styles from './index.less';

class Align extends React.Component {
  render() {
    const { align, onChange } = this.props;
    return <div className="align-item">
      <a className={classnames({ 'active': align === 'left' })} onClick={() => { onChange('left') }}><i className="icon icon-align-to-left"></i></a>
      <a className={classnames({ 'active': align === 'center' })} onClick={() => { onChange('center') }}><i className="icon icon-center-text-alignment"></i></a>
      <a className={classnames({ 'active': align === 'right' })} onClick={() => { onChange('right') }}><i className="icon icon-align-to-right"></i></a>
    </div>
  }
}

export default Align;