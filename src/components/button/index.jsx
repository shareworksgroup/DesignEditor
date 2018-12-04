import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './index.mess';

const Button = (props) => {
  const { children, style, className, icon = null, loading = false, onClick } = props;
return <button className={classnames(styles.button, className, icon && styles.icon)} style={style} onClick={onClick}>
    {loading&&<i className={styles.loading} />}
    {icon}
    <span>{children}</span>
  </button>;
};

Button.Group = (props) => {
  const { children, style, className } = props;
  return <div className={classnames(styles.buttonGroup, className)}>{children}</div>
};

export default Button;