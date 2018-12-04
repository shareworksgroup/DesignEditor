import React from 'react';
import classnames from 'classnames';
import Animate from 'rc-animate';
import BaseDialog from '../dialog/BaseDialog';
import LazyRenderBox from '../dialog/LazyRenderBox';
import Head from './Head';
import Frame from './Frame';
import style from './index.less';

class ChatBox extends React.Component {
  render() {
    const { title, back, className, style = {}, children, destroyOnClose = false, visible = false, mask, maskClosable, onClose = () => {}, onBack = () => {} } = this.props;
    const boxElement = <LazyRenderBox
        key="chatbox"
        className={classnames('feedback', className)}
        hiddenClassName='hide'
        visible={visible}
        style={style}
      >
      <div class="feedback-list">
        <Head title={title} back={back} onClose={onClose} onBack={onBack}></Head>
        <div className="feedback-box">
          {children}
        </div>  
      </div>
    </LazyRenderBox>;
    return <BaseDialog visible={visible} mask={mask} maskClosable={maskClosable} onClose={onClose}>
      <Animate
        key="chatbox"
        showProp="visible"
        transitionAppear
        component=""
        transitionName={`bottom`}
      >
          {(!!visible || !destroyOnClose) ? boxElement : null}
      </Animate>
    </BaseDialog>;
  }
}

ChatBox.Frame = Frame;

export default ChatBox;