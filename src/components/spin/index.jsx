import React from 'react';
import classnames from 'classnames';
import styles from './index.mess';

class Spin extends React.PureComponent {
  render() {
    const { strokeWidth = 3, width = 50, className, style = {} } = this.props;
    return <div className={classnames(styles.loader, className)} style={{ width: width, ...style }}>
      <svg className={styles.circular} viewBox="25 25 50 50">
        <circle className={styles.path} cx="50" cy="50" r="20" fill="none" stroke-width={strokeWidth} stroke-miterlimit="10"></circle>
      </svg>
    </div>;
  }
}

export default Spin;