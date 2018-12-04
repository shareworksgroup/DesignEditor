import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import Animate from 'rc-animate';
import LazyRenderBox from './LazyRenderBox';
import BaseDialog from './BaseDialog';
import classnames from 'classnames';
import styles from './SideDialog.less';


/**
 *  class SideDialog 侧边对话框，基于BaseDialog实现，用于提供左，右，上，下浮出边框提供内容浏览
 *  <SideDialog visible onClose={toggleShowAdvance} direction="left|right|top|bottom">
      <div>我是侧边对话框内容</div>
    </SideDialog>
    maskClosable 是否点击蒙层能关闭对话框
    direction 侧边对话框弹出位置
 */
class SideDialog extends Component {
  constructor(props) {
    super(props);
    const { size = 500, direction = 'right' } = props;
    this.state = {
      size,
      direction,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    this.update();
  }
  
  componentDidMount() {
    this.update();
  }

  update(){
    if (this.props.visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }
  
  render() {
    const { title, className, visible = false, onClose = () => {}, maskClosable = true,
      needMask = true, closeDirection = 'left', destroyOnClose, style = {} } = this.props;
    const wh = (this.state.direction === 'left' || this.state.direction === 'right') ? 'width' : 'height';
    const selfStyle = { [wh]: this.state.size, ...style };
    const titleType = Object.prototype.toString.call(title);
    const titleComponent = titleType === '[object String]' ?  (<div className="ui-side-dialog-header">
      <i className={classnames('mdi-content-clear', closeDirection==='right' && 'ui-side-dialog-fr')} onClick={onClose} />
      <h3>{title}</h3>
    </div>) : (<div className="ui-side-dialog-header">
      {title}
    </div>);
    return (<BaseDialog destroyOnClose visible={visible} onClose={onClose} maskClosable={maskClosable} mask={needMask}>
        <Animate
          key="sideDialog"
          showProp="visible"
          transitionAppear
          component=""
          transitionName={`ui-side-dialog-${this.state.direction}`}
        >
          { (!!visible || !destroyOnClose) ? <LazyRenderBox
            key="sideDialog"
            style={selfStyle}
            className={`ui-side-dialog ui-side-dialog-${this.state.direction}`}
            hiddenClassName='ui-side-dialog-hidden'
            visible={visible}
          >
            <Scrollbars autoHide>
              <div className="ui-side-dialog-wrapper">
                {title && titleComponent}
                <div className="clearfix">{this.props.children}</div>
              </div>
            </Scrollbars>
          </LazyRenderBox> : null}
        </Animate>
      </BaseDialog>);
  }
}

export default SideDialog;