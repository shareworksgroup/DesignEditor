import React, { Component } from 'react';
import classnames from 'classnames'
import { Scrollbars } from 'react-custom-scrollbars';

const Frame = (props) => {
  const { children, visible = false } = props;
  return <div class={classnames("box-height", visible && 'show')}>
    <Scrollbars autoHide>
      <div class="p15">
        {children}
      </div>
    </Scrollbars>
  </div>;
}

export default Frame;