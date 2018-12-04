import React from 'react';
import classnames from 'classnames';

const FloatButton = (props) => {
  const { onClick = () => {}, className, style, icon } = props;
  return <button type="button" style={style} onClick={onClick} className={classnames("float-add-btn", className)} >
    <i className={classnames(icon, "fa-lg")} />
  </button>;
};

export default FloatButton;