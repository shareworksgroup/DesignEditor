import React from 'react';
import classnames from 'classnames';
import styles from './index.less';

class Align extends React.Component {
  render() {
    const { align, onChange } = this.props;
    return <div className="align-item">
      <a className={classnames({ 'active': align === 'left' })} onClick={() => { onChange('left') }}><i className="mdi-editor-format-align-left"></i></a>
      <a className={classnames({ 'active': align === 'center' })} onClick={() => { onChange('center') }}><i className="mdi-editor-format-align-center"></i></a>
      <a className={classnames({ 'active': align === 'right' })} onClick={() => { onChange('right') }}><i className="mdi-editor-format-align-right"></i></a>
    </div>
  }
}

export default Align;