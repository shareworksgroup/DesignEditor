import React, { Component } from 'react';
import classnames from 'classnames';

const Head = (props) => {
  const { title, back = false, style = {}, className, onClose = () => {}, onBack = () => {} } = props;
  return <div className={classnames("top-menu", className)} style={style}>
    <div className="top-title" name="default">
      <h3 onClick={() => { back && onBack() }}>{back && <i class="mdi-navigation-chevron-left"></i>}{title}</h3>
      <a href="javascript:void(0);" className="pull-right" onClick={onClose}>
        <i className="mdi-content-remove"></i>
      </a>
    </div>
  </div>;
};

export default Head;