import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './index.less';

const Button = (props) => {
  const { children, style, className, icon = null, loading = false, onClick } = props;
return <button className={classnames("button", className, icon && "icon")} style={style} onClick={onClick}>
    {loading&&<i className="loading" />}
    {icon}
    <span>{children}</span>
  </button>;
};

Button.Group = (props) => {
  const { children, style, className } = props;
  return <div className={classnames("buttonGroup", className)}>{children}</div>
};

export default Button;