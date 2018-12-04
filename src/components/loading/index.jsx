import React from 'react';
import classnames from 'classnames';
import styles from './index.mess';
import Spin from '../spin';

class Loading extends React.Component {
  render(){
    const { children, show = false, height, spinStyle = {}, className } = this.props;
    return (<div style={{height: height? height+'px':'100%'}} className={styles.wrap}>
      <div className={classnames(styles.spinWrap, className)} style={{ display: show ? 'block' : 'none' }}>
        <Spin className={styles.spin} style={spinStyle} />
      </div>
      {children}
    </div>);
  }
}

export default Loading;