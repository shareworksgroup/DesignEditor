
import React from 'react';
import classnames from 'classnames';
import RCDialog from 'rc-dialog';
import styles from './index.less';
import pic from './sprite.png';


class Dialog extends React.Component {
  render() {
    const { visible = false, center = true, style, onClose, mousePosition = null, destroyOnClose = true,
      title, iconClass, showClose = true, maskClosable = false, buttons, children } = this.props;
    const icon = iconClass && <i className={iconClass} />;
    return <RCDialog
      style={style}
      visible={visible}
      animation="zoom"
      maskAnimation="fade"
      onClose={onClose}
      mousePosition={mousePosition}
      destroyOnClose={destroyOnClose}
      animation="zoom"
      maskAnimation="fade"
      maskClosable={maskClosable}
      wrapClassName={classnames({'center': center, 'dialog_show_close': showClose})}
    >
      <div className="widget-container">
        {title && <div className="heading">
         {icon} {title}
        </div>}
        <div className="widget-content">
          <div>
            {children}
          </div>
          {buttons && <div className="dialog_button_container">
            {buttons}
          </div>}
        </div>
      </div>
    </RCDialog>
  }
};

export default Dialog;
