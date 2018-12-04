import React from 'react';
import Animate from 'rc-animate';
import classnames from 'classnames';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import Spin from '../spin';
import LazyRenderBox from '../dialog/LazyRenderBox';
import BaseDialog from '../dialog/BaseDialog';
import { resizeImg } from './util';
import styles from './index.less';
import slideBottomTopFadeCss from '../react-animate-css/slide-top-bottom-fade';
import slideLeftRightFadeCss from '../react-animate-css/slide-left-right-fade';

const ERRORIMG = 'Sources/images/cancel-face.png';

class FancyBox extends React.Component {
  render() {
    const { images = [], index = 0, direction, rotate, height=0, width=0, onPrev, onNext } = this.props;
    const isRotate = rotate/90%2 !== 0;
    const transform = `translate3d(${isRotate ? (height-width)/2 : 0}px, ${isRotate ? (width-height)/2 : 0}px, 0)
      rotate(${rotate}deg)`;
    return <div className="ui-fancybox-container">
      <div className="ui-fancybox-outer" key={index}>
        <div className="ui-fancybox-image-wrapper">
            <img
              style={{transform: transform, width: width, height: height }}
              key={index}
              src={images[index]}
              onError={(e) => { e.target.src = `../${ERRORIMG}`; }}    
          />
        </div>
        <div onClick={onPrev} className="ui-fancybox-slide ui-fancybox-slideleft"><i className="mdi-hardware-keyboard-arrow-left" /></div>
        <div onClick={onNext} className="ui-fancybox-slide ui-fancybox-slideright"><i className="mdi-hardware-keyboard-arrow-right" /></div>
      </div>
    </div>;
  }
}


class FancyBoxWrapper extends React.Component {
  constructor(props) {
    super(props);
    const { images, index } = this.props;
    this.state = {
      cache: [],
      index,
      direction: 'bottom',
      rotate: 0,
      style: {},
      loading: true,
    };
  }

  componentDidMount(){
    this.updateImageCache();
    this.update();
    window.addEventListener('resize', this.onResize);
  }

  componentWillReceiveProps({ index }){
    if (index !== this.state.index) {
      this.setState({ index });
    }

  }
  
  componentDidUpdate(prevProps, prevState) {
    this.update();
    if (prevProps.images.length !== this.props.images.length) {
      this.updateImageCache();
    }
  }

  componentWillUnmount(){
    window.removeEventListener('resize', this.onResize);
  }

  updateImageCache = () => {
    this.setState({ loading: true });
    const { images } = this.props;
    const fetchs = images.map(url => new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve(img);
      };
      img.onerror = () => {
        resolve(null);
      };
      img.src = url;
    }));
    Promise.all(fetchs).then((images) => {
      const cache = images;
      this.setState({ loading: false, cache: cache.map(i => {
        const image = i == null ? { width: 140, height: 140 } : i;
        const newSize = resizeImg(window.innerWidth*.8, window.innerHeight*.8, image.width, image.height);
        const rotateNewSize = resizeImg(window.innerWidth*.8, window.innerHeight*.8, image.height, image.width);
        return {
          data: image,
          width: newSize.width,
          height: newSize.height,
          rotateWidth: rotateNewSize.width,
          rotateHeight: rotateNewSize.height,
        };
      })});
    });
  }
  
  onResize = () => {
    this.forceUpdate();
  }

  update(){
    if (this.props.visible) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '18px';
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '0';
    }
  }

  onPrev = () => {
    const { index } = this.state;
    const { images } = this.props;
    this.setState({
      index: index === 0 ? (images.length-1) : (index-1),
      direction: 'right',
      rotate:0,
    });
  }

  onNext = () => {
    const { index } = this.state;
    const { images } = this.props;
    this.setState({
      index: (index+1) >= images.length ? 0 : (index+1),
      direction: 'left',
      rotate:0,
    });
  }

  onPlay = () => {
    const { duration = 3000 } = this.props;
    if (this.state.timer) {
      window.clearInterval(this.state.timer);
      this.setState({ timer: null });
    } else {
      this.setState({ timer: setInterval(this.onNext, duration) });
    }
  }

  onRotate = (v) => {
    const newRotate = this.state.rotate + v;
    this.setState({ rotate: newRotate });
  }

  onClose = () => {
    const { onClose = () => {} } = this.props;
    this.setState({ rotate: 0, index: 0, timer: null, direction: 'bottom' });
    window.clearInterval(this.state.timer);
    
    onClose();
  }

  render() {
    const { images = [], visible, onClose = () => { }, maskClosable = true, needMask = true, destroyOnClose = true } = this.props;
    const imgData = this.state.cache[this.state.index];
    const needTurn = this.state.rotate/90%2 !== 0;
    return <BaseDialog destroyOnClose={destroyOnClose} visible={visible} onClose={this.onClose} maskClosable={maskClosable} mask={needMask}>
      { this.state.loading && visible && <Spin className="ui-fancybox-loading"/>}
       <CSSTransitionGroup
          className=""
          transitionName={`slide-${this.state.direction}-fade`}
          transitionEnter={true}
          transitionLeave={true}
          transitionEnterTimeout={250}
          transitionLeaveTimeout={250}
        >
        {(( !!visible && !this.state.loading && !!imgData ) || !destroyOnClose) ? <LazyRenderBox
          key={`fancybox-${this.state.index}`}
          style={{
            width: needTurn ? imgData.rotateWidth : imgData.width,
            height: needTurn ? imgData.rotateHeight : imgData.height,
            left: needTurn ? (window.innerWidth/2 - imgData.rotateWidth/2) : (window.innerWidth / 2 - imgData.width / 2),
            top: needTurn ? (window.innerHeight/2 - imgData.rotateHeight/2) : (window.innerHeight / 2 - imgData.height / 2),
          }}
          className={`ui-fancybox`}
          hiddenClassName='ui-fancybox-hidden'
          visible={visible}
        >
          <FancyBox
            index={this.state.index}
            images={images}
            direction={this.state.direction}
            width={needTurn ? imgData.rotateHeight : imgData.width}
            height={needTurn ? imgData.rotateWidth : imgData.height}
            rotate={this.state.rotate}
            onPrev={this.onPrev} onNext={this.onNext} />
        </LazyRenderBox> : null}
      </CSSTransitionGroup>
      { !this.state.loading && <Animate
        key="fancybox-toolbar"
        showProp="visible"
        transitionAppear
        component=""
        transitionName={`slide-${this.state.direction}-fade`}
        >
        {(!!visible || !destroyOnClose) ? <LazyRenderBox
          key="fancybox-toolbar"
          className={`ui-fancybox-toolbar`}
          hiddenClassName='ui-fancybox-hidden'
          visible={visible}
        >
          <ul>
            <li><a class="btnPrev" title="Previous" onClick={this.onPrev} href="javascript:;"></a></li>
            <li><a class={classnames("btnPlay", this.state.timer && "btnPlayOn")} title="Start slideshow" onClick={this.onPlay} href="javascript:;"></a></li>
            <li><a class="btnNext" title="Next" onClick={this.onNext} href="javascript:;"></a></li>
            <li><a class="btnRotateL" onClick={() => {this.onRotate(-90);}} title="left" href="javascript:;"></a></li>
            <li><a class="btnRotateR" onClick={() => {this.onRotate(90);}}  title="right" href="javascript:;"></a></li>
            <li><a class="btnToggle btnDisabled" title="Toggle size" href="javascript:;"></a></li>
            <li><a class="btnClose" onClick={this.onClose} title="Close" href="javascript:;"></a></li>
          </ul>
        </LazyRenderBox> : null}
      </Animate>}
    </BaseDialog>
  }
}

export default FancyBoxWrapper;

