import React from 'react';
import classnames from 'classnames';
import styles from './flat.less';

const Flat = (props) => {
  const { children, onClick, primary } = props;
  return <input type="button" class={classnames('btn-modal', primary && 'flat_primary')} value={children} onClick={onClick} />;
};

export default Flat;