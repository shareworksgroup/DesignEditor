import Moon from 'moon';

const PubSub = Moon.PubSub;

/* eslint-disable */

/**
 * canvas精灵动画库
 * @author yanglang
 * @date 20160606
 * @description 用于实现canvas精灵动画，基于Stage,Layer以及DisplayObject精灵等概念，支持多Layer内嵌多精灵进行动画
 * 各精灵支持各自不同的fps帧率，支持动画过程中动态设定fps，各精灵支持回调以及是否完成动画后自动移除，也可以自行调用移除接口。
 * 支持给定从哪一帧精灵图到哪一帧精灵图开始运动，支持定义循环次数
 * 支持透明度opacity，旋转角度rotate，混合光源blend等属性
 * 支持横向精灵图或纵向精灵图
 * 提供一个tween对象在Math下，提供缓动函数以及队列动画API，类似于白鹭引擎的Tween接口或jQuery的animation接口，可以链式调用to方法进行队列动画。
 */
const SNAnimation = {};
const percent_reg = /^\d*\.?\d*%$/;
window.requestAnimationFrame = window.requestAnimationFrame || function (fn) {return setTimeout(fn,1000/60)}
window.cancelAnimationFrame = window.cancelAnimationFrame || clearTimeout;
/**
 * Layer动画层
 * @param options
 * @constructor
 */
SNAnimation.Layer = function (options) {
  var defaults = {
    width: 0,
    height: 0,
    autostart: true,
    autorender: true
  };
  var params = { ...defaults, ...options };
  this.width = params.width;
  this.height = params.height;
  this.autostart = params.autostart;
  this.autorender = params.autorender;
  this.render = params.autorender ? true : false;
  this.displayObjectArray = [];
  this.isRendered = false;
  this.cacheCanvas = document.createElement("canvas");
  this.cacheCtx = this.cacheCanvas.getContext("2d");
  this.cacheCanvas.width = this.width;
  this.cacheCanvas.height = this.height;
};

SNAnimation.Layer.prototype = {
  /**
   * 给层添加精灵
   * @param display
   */
  addDisplayObject: function (display) {
    this.displayObjectArray.push(display);
    display.setParent(this);
  },
  /**
   * 移除精灵
   * @param display
   */
  removeDisplayObject: function (display) {
    for (var i = 0; i < this.displayObjectArray.length; i++) {
      if (this.displayObjectArray[i] == display) {
        this.displayObjectArray.splice(i, 1);
        break;
      }
    }
  },
  startRender: function () {
    this.render = true;
  },
  stopRender: function () {
    this.render = false;
  },
  /**
   * 获取精灵数组
   * @returns {Array}
   */
  getDisplayObject: function () {
    return this.displayObjectArray;
  },
  /**
   * 启动精灵动画
   */
  start: function () {
    for (var i = 0; i < this.displayObjectArray.length; i++) {
      this.displayObjectArray[i].getTimer().start();
    }
  },
  /**
   * 停止精灵动画
   */
  stop: function () {
    for (var i = 0; i < this.displayObjectArray.length; i++) {
      this.displayObjectArray[i].getTimer().stop();
    }
  },
  /**
   * 移除图层内所有精灵
   */
  remove: function () {
    for (var i = 0; i < this.displayObjectArray.length; i++) {
      this.displayObjectArray[i].getTimer().stop();
      this.displayObjectArray[i].remove();
    }
    this.displayObjectArray = [];
    SNAnimation.Renderer.removeLayer(this);
  },
  /**
   * 清空离屏canvas
   * @private
   */
  _clearCanvas: function () {
    if (!this.cacheCanvas)
      return;
    var ctx = this.cacheCanvas.getContext("2d");
    ctx.clearRect(0, 0, this.width, this.height);
  },
};

/**
 * 图片资源管理器
 * 用于优化加载图片资源
 * @type {{images: {}, addImages: SNAnimation.ImageManager.addImages}}
 */
SNAnimation.ImageManager = {
  images: {},
  getImage: function (key) {
    return this.images[key];
  },
  /**
   * 添加图片资源
   * @param options
   */
  addImages: function (options) {
    var that = this;
    for (var key in options) {
      try {
        var imageUrl = options[key];
        var img = new Image();
        this.images[key] = {
          img: img,
          src: imageUrl,
          loaded: false
        };
        (function (_key) {
          img.onload = function () {
            that.images[_key].loaded = true;
            PubSub.notifyWith('__SNANI_IMAGELOAD_' + _key, this);
          };
        })(key);
        img.src = imageUrl;
      } catch (e) { }
    }
  }
};


/*soundManager.setup({
    onready:function(){
        PubSub.notify('__SNANI_SOUNDMANAGER_LOADED');
    }
});
var __BACKGROUND_MUSIC = '__SNANI_SOUNDMANAGER_BACKGROUNDMUSIC';
SNAnimation.AudioManager = {
    audios:{},
    backgroundMusicFrom:0,
    setBackgroundMusic:function(url,options){
        var that = this;
        this.backgroundMusic = soundManager.createSound({
            multiShot:true,
            autoLoad:true,
            stream:true,
            id:__BACKGROUND_MUSIC,
            url: url,
            onfinish:function(){
                that.playBackgroundMusic();
            },
            onstop:function(){
                that.backgroundMusicFrom = this.position;
                console.log('sound stopped at position ' + this.position)
            }
        });
        return this;
    },
    playBackgroundMusic:function(){
        this.backgroundMusic.play({position:this.backgroundMusicFrom,pan:75});
        return this;
    },
    stopBackgroundMusic:function(){
        this.backgroundMusic.stop();
        return this;
    },
    pauseBackgroundMusic:function(){
        this.backgroundMusic.pause();
        return this;
    },
    playAudio:function(key,options){
        this.pauseBackgroundMusic();
        this.audios[key] && soundManager.play(key,options?options:{});
        return this;
    },
    stopAudio:function(key){
        this.audios[key] && this.audios[key].audio.stop();
        return this;
    },
    addAudio:function(options){
        var that = this;
        for(var key in options){
            try{
                var audioUrl = options[key];
                this.audios[key] = {
                    audio:soundManager.createSound({
                        multiShot:true,
                        autoLoad:true,
                        stream:true,
                        id:key,
                        url: audioUrl,
                        onfinish: function() {
                            that.playBackgroundMusic();
                        }
                    }),
                    key:key
                };
            }catch(e){}
        }
        return this;
    }
};*/

/**
 * 精灵类
 * @param options
 * @constructor
 */
SNAnimation.DisplayObject = function (options) {
  var defaults = {
    x: 0,//绘制位置x坐标
    y: 0,//绘制位置y坐标
    left: 0,//精灵图左偏移
    top: 0,//精灵图下偏移
    width: 0,//单个精灵宽
    height: 0,//单个精灵高
    originX: 0,//变形原点
    originY: 0,//变形原点
    opacity: 1,
    rotate: 0,//旋转角度
    horizontal: true,//默认横向精灵图，false则为纵向精灵图
    removeWhenEnd: true,//是否动画完成后自动移除精灵
    onComplete: () => { },//动画完成事件回调方法
    onStart: () => { },//动画开始事件回调方法
    isStarted: false,//动画是否已开始
    backgroundImage: ''//精灵图资源名称
  };
  var params = { ...defaults, ...options };
  if (!params.backgroundImage) {
    throw new Error('请提供背景图片资源名称');
  }
  for (var key in params) {
    this[key] = params[key];
  }
  !params.drawWidth && (this.drawWidth = params.width);
  !params.drawHeight && (this.drawHeight = params.height);
  var that = this;
  this.id = 'DISPLAY' + new Date().getTime();
  var imgObject = SNAnimation.ImageManager.getImage(params.backgroundImage);
  this.sourceImage = null;//精灵图资源对象 初始为null
  if (imgObject && imgObject.loaded) {
    //图片资源已加载完成
    this.sourceImage = imgObject.img;
  } else {
    //图片资源 尚未加载完成，需要订阅通知
    PubSub.subscribe('__SNANI_IMAGELOAD_' + params.backgroundImage, function () {
      that.sourceImage = this;
    });
  }
};

SNAnimation.DisplayObject.prototype = {
  /**
   * 添加到Layer图层中
   * @layer 图层对象
   */
  addTo: function (layer) {
    layer.addDisplayObject(this);
    this.parent = layer;
    return this;
  },
  /**
   * 从当前图层中移除
   */
  remove: function () {
    if (this.parent) {
      this.timer && this.timer.stop();
      this.parent.removeDisplayObject(this);
    }
  },
  /**
   * 设置所属图层
   * @param parent
   */
  setParent: function (parent) {
    this.parent = parent;
  },
  /**
   * 获取所属图层
   * @returns {*}
   */
  getParent: function () {
    return this.parent;
  },
  /**
   * 设置定时器
   * @param timer
   */
  setTimer: function (timer) {
    this.timer = timer;
  },
  /**
   * 获取定时器
   * @returns {*}
   */
  getTimer: function () {
    return this.timer;
  },
  /**
   * 精灵动画结束
   */
  doComplete: function () {
    this.onComplete.call(this);//动画完成事件回调
    this.getTimer().stop();//停止计时器
    this.removeWhenEnd && this.remove();//若开启了动画完成自动移除，则调用remove方法
  },
  /**
   * 支持动画运行过程中动态设定fps
   * @param fps
   */
  setFps: function (fps) {
    if (this.timer) {
      this.timer.fps = fps;
      this.timer.stop();
      this.timer.start();
    }
  }
};

/**
 * 定时器对象
 * @type {{cycle: SNAnimation.Timer.cycle}}
 */
SNAnimation.Timer = {
  /**
   * 给精灵对象生成定时器
   * @param display 精灵对象
   * @param fps 帧率
   * @param options
   */
  cycle: function (display, fps, options) {
    var defaults = {
      from: 0,//帧开始索引
      to: 0,//帧结束索引
      loop: 0,//循环次数,
      delay: 0,//延迟帧数,
      showWhenDelay: false//延迟是否渲染精灵
    };
    var params = { ...defaults, ...options };
    params.loop--;
    var timer = {
      _interval: null,
      running: false,
      count: 0,//第几帧计数器
      delay: params.delay,
      showWhenDelay: params.showWhenDelay,
      start: function () {
        if (this.running)
          return;
        var that = this;
        that.running = true;
        that.fps = 1000 / parseFloat(that.fps ? that.fps : fps);//通过帧率计算多少毫秒执行一次位置计算
        that.count = params.from;
        that.single = params.from == params.to;//是否是单张图
        display.horizontal ? (display.left += params.from * display.width) : (display.top += params.from * display.height);
        this._interval = setInterval(function () {
          if (that.delay-- > 0) {
            return;
          }
          if (display.horizontal) {
            var offset = that.count * display.width;
            if (display.left >= display.width * params.to) {
              //抵达末帧之后绘制完再次回到首帧  非单张图的情况下 判断
              (params.loop == 0) && display.doComplete();//精灵动画任务完成
              params.loop && (display.left = params.from * display.width);
              params.loop > 0 && (params.loop--);
              that.count = params.from - 1;
            } else {
              display.left = display.width + offset;
            }
          } else {
            var offset = that.count * display.height;
            if (display.top >= display.height * params.to) {
              //抵达末帧
              params.loop == 0 && display.doComplete();//精灵动画任务完成
              params.loop && (display.top = params.from * display.height);
              params.loop > 0 && (params.loop--);
              that.count = params.from - 1;
            } else {
              display.top = display.height + offset;
            }
          }
          that.count++;
        }, that.fps);
      },
      /**
       * 停止动画计算
       */
      stop: function () {
        window.clearInterval(this._interval);
        this._interval = null;
        this.running = false;
      },
      /**
       * 暂停。。。
       */
      pause: function () {
        this.stop();
      }
    };
    display.setTimer(timer);
  }
};
var globalRunning = false;
/**
 * 全局渲染器
 * @type {{layers: Array, width: number, height: number, $canvas: null, addLayer: SNAnimation.Renderer.addLayer, load: SNAnimation.Renderer.load, start: SNAnimation.Renderer.start, stop: SNAnimation.Renderer.stop, pause: SNAnimation.Renderer.pause, restart: SNAnimation.Renderer.restart, clear: SNAnimation.Renderer.clear, _clear: SNAnimation.Renderer._clear}}
 */
SNAnimation.Renderer = {
  layers: [],//所有图层列表
  pointer: true,
  width: 300,
  height: 300,
  $canvas: null,
  /**
   * 添加图层
   * @param layer
   */
  addLayer: function (layer) {
    this.layers.push(layer);
  },
  /**
   * 移除图层
   * @param layer
   */
  removeLayer: function (layer) {
    for (var i = 0; i < this.layers.length; i++) {
      if (this.layers[i] == layer) {
        this.layers.splice(i, 1);
        break;
      }
    }
  },
  clearDom: function(dom) {
    const children = dom.children;
    if (children && children.length > 0) {
      children.forEach( item => dom.removeChild(item));
    }
  },
  /**
   * 加载到dom结点上
   * @param dom
   */
  load: function (dom) {
    this.clearDom(dom);
    var style = this.pointer ? 'pointer-events: none;' : '';
    const rect = dom.getBoundingClientRect();
    var height = dom.style.height || rect.height, width = dom.style.width || rect.width;
    var that = this;
    this.width = width;
    this.height = height;
    const canvas = document.createElement('canvas');
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    canvas.setAttribute('id', '__SNAniCanvas');
    canvas.style.cssText = style;
    dom.appendChild(canvas);
    this.$canvas = canvas;
    PubSub.subscribe('onorientationchange', function (orientation) {
      try {
        const _rect = dom.getBoundingClientRect();
        that.width = _rect.width;
        that.height = _rect.height;
        that.$canvas.setAttribute('height', that.height)
        that.$canvas.setAttribute('width', that.width);
      } catch (e) { console.log(e) }
    });
  },
  /**
   * 开始执行全局动画
   */
  start: function () {
    if (!this.$canvas)
      throw new Error('请先执行load方法');
    PubSub.notify('__SNANI_onRender');
    for (var i = 0; i < this.layers.length; i++) {
      (this.layers[i].autostart && this.layers[i].render) && this.layers[i].start();
      //this.layers[i].start();
    }
  },
  /**
   * 停止所有动画
   */
  stop: function () {
    for (var i = 0; i < this.layers.length; i++) {
      this.layers[i].stop();
    }
    globalRunning = false;
  },
  /**
   * 暂停所有动画。。
   */
  pause: function () {
    this.stop();
  },
  /**
   * 恢复所有停止的动画
   */
  restart: function () {
    for (var i = 0; i < this.layers.length; i++) {
      this.layers[i].start();
    }
    globalRunning = true;
    PubSub.notify('__SNANI_onRender');
  },
  /**
   * 清除全局动画
   */
  clear: function () {
    this.stop();
    for (var i = 0; i < this.layers.length; i++) {
      this.layers[i].remove();
    }
    this.layers = [];
    this._clearCanvas();
  },
  /**
   * 清空canvas
   * @private
   */
  _clearCanvas: function () {
    if (!this.$canvas)
      return;
    var ctx = this.$canvas.getContext("2d");
    ctx.clearRect(0, 0, this.width, this.height);
    for (var i = 0; i < this.layers.length; i++) {
      this.layers[i]._clearCanvas();
    }
  }
};

/**
 * 订阅画布渲染事件
 */
PubSub.subscribe('__SNANI_onRender', function () {
  var ctx = SNAnimation.Renderer.$canvas.getContext("2d");
  globalRunning = true;
  const doRender = () => {
    PubSub.notifyLike('__SNANI_rendernotify');
    SNAnimation.Renderer._clearCanvas();
    for (var i = 0; i < SNAnimation.Renderer.layers.length; i++) {
      const layer = SNAnimation.Renderer.layers[i];
      //先判断图层是否需要渲染
      if (!layer.render)
        continue;
      const ctxCache = layer.cacheCtx;
      var displays = layer.getDisplayObject();
      for (var j = 0; j < displays.length; j++) {
        var displayObj = displays[j];
        if (!displayObj.sourceImage || (displayObj.getTimer().delay > 0 && !displayObj.getTimer().showWhenDelay))
          continue;
        
        ctxCache.save();
        ctxCache.globalAlpha = typeof displayObj.opacity != 'undefined' ? displayObj.opacity : 1;//设置透明度
        displayObj.blend && (ctxCache.globalCompositeOperation = displayObj.blend);
        ctxCache.translate(displayObj.x + displayObj.width / 2, displayObj.y + displayObj.height / 2);//设置画布上的绘图中心点位置
        displayObj.rotate && ctxCache.rotate(displayObj.rotate * Math.PI / 180);//若设置了旋转，则rotate画布
        var originX = percent_reg.test(displayObj.originX) ? parseFloat(displayObj.originX) * displayObj.drawWidth / 100 : displayObj.originX;
        var originY = percent_reg.test(displayObj.originY) ? parseFloat(displayObj.originY) * displayObj.drawWidth / 100 : displayObj.originY;
        ctxCache.drawImage(displayObj.sourceImage,
          displayObj.left,
          displayObj.top,
          displayObj.width,
          displayObj.height,
          -displayObj.drawWidth / 2 - originX,//以画布绘图起点减掉开始加的一半宽度，并按给定的变形原点进行偏移
          -displayObj.drawHeight / 2 - originY,//同上
          displayObj.drawWidth,
          displayObj.drawHeight);

        ctxCache.restore();
      }
      ctx.drawImage(layer.cacheCanvas , 0, 0);
    }
    requestAnimationFrame(function () {
      if (globalRunning)
        doRender();
    });
  };
  requestAnimationFrame(function () {
    doRender();
  });
});


window.SNAnimation = SNAnimation;


/*
    * Tween.js
    * t: current time（当前时间）
    * b: beginning value（初始值）
    * c: change in value（变化量）
    * d: duration（持续时间）
    */
var Tween = {
  Linear: function (t, b, c, d) { return c * t / d + b; },
  Quad: {
    easeIn: function (t, b, c, d) {
      return c * (t /= d) * t + b;
    },
    easeOut: function (t, b, c, d) {
      return -c * (t /= d) * (t - 2) + b;
    },
    easeInOut: function (t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t + b;
      return -c / 2 * ((--t) * (t - 2) - 1) + b;
    }
  },
  Cubic: {
    easeIn: function (t, b, c, d) {
      return c * (t /= d) * t * t + b;
    },
    easeOut: function (t, b, c, d) {
      return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    easeInOut: function (t, b, c, d) {
      if ((t /= d / 2) < 1)
        return c / 2 * t * t * t + b;
      return c / 2 * ((t -= 2) * t * t + 2) + b;
    },
    easeOutIn: function (t, b, c, d) {
      if ((t /= d / 2) > 1)
        return c / 2 * ((t -= 2) * t * t + 2) + b;
      return c / 2 * t * t * t + b;
    }
  },
  Quart: {
    easeIn: function (t, b, c, d) {
      return c * (t /= d) * t * t * t + b;
    },
    easeOut: function (t, b, c, d) {
      return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    easeInOut: function (t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
      return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    }
  },
  Quint: {
    easeIn: function (t, b, c, d) {
      return c * (t /= d) * t * t * t * t + b;
    },
    easeOut: function (t, b, c, d) {
      return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    easeInOut: function (t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
      return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    }
  },
  Sine: {
    easeIn: function (t, b, c, d) {
      return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    },
    easeOut: function (t, b, c, d) {
      return c * Math.sin(t / d * (Math.PI / 2)) + b;
    },
    easeInOut: function (t, b, c, d) {
      return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    }
  },
  Expo: {
    easeIn: function (t, b, c, d) {
      return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    easeOut: function (t, b, c, d) {
      return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    },
    easeInOut: function (t, b, c, d) {
      if (t == 0) return b;
      if (t == d) return b + c;
      if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
      return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    }
  },
  Circ: {
    easeIn: function (t, b, c, d) {
      return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    easeOut: function (t, b, c, d) {
      return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    },
    easeInOut: function (t, b, c, d) {
      if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
      return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    }
  },
  Elastic: {
    easeIn: function (t, b, c, d, a, p) {
      var s;
      if (t == 0) return b;
      if ((t /= d) == 1) return b + c;
      if (typeof p == "undefined") p = d * .3;
      if (!a || a < Math.abs(c)) {
        s = p / 4;
        a = c;
      } else {
        s = p / (2 * Math.PI) * Math.asin(c / a);
      }
      return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    easeOut: function (t, b, c, d, a, p) {
      var s;
      if (t == 0) return b;
      if ((t /= d) == 1) return b + c;
      if (typeof p == "undefined") p = d * .3;
      if (!a || a < Math.abs(c)) {
        a = c;
        s = p / 4;
      } else {
        s = p / (2 * Math.PI) * Math.asin(c / a);
      }
      return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
    },
    easeInOut: function (t, b, c, d, a, p) {
      var s;
      if (t == 0) return b;
      if ((t /= d / 2) == 2) return b + c;
      if (typeof p == "undefined") p = d * (.3 * 1.5);
      if (!a || a < Math.abs(c)) {
        a = c;
        s = p / 4;
      } else {
        s = p / (2 * Math.PI) * Math.asin(c / a);
      }
      if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
      return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    }
  },
  Back: {
    easeIn: function (t, b, c, d, s) {
      if (typeof s == "undefined") s = 1.70158;
      return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    easeOut: function (t, b, c, d, s) {
      if (typeof s == "undefined") s = 1.70158;
      return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    easeInOut: function (t, b, c, d, s) {
      if (typeof s == "undefined") s = 1.70158;
      if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
      return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    }
  },
  Bounce: {
    easeIn: function (t, b, c, d) {
      return c - Tween.Bounce.easeOut(d - t, 0, c, d) + b;
    },
    easeOut: function (t, b, c, d) {
      if ((t /= d) < (1 / 2.75)) {
        return c * (7.5625 * t * t) + b;
      } else if (t < (2 / 2.75)) {
        return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
      } else if (t < (2.5 / 2.75)) {
        return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
      } else {
        return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
      }
    },
    easeInOut: function (t, b, c, d) {
      if (t < d / 2) {
        return Tween.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
      } else {
        return Tween.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
      }
    }
  },
  /**
   * 根据给定精灵对象获取动画对象
   * 返回的动画对象具有to方法，支持属性渐变
   * @param displayObject
   * @returns {{to: function(props,duration,ease){}}
   * props:属性对象，比如{x:500,y:200,opacity:.8}代表精灵将运动到x为500，y为200的位置，透明度变为0.8
   * duration:时间，动画运动的时间长度，毫秒计
   * ease:缓动函数，通过Math.tween内提供
   */
  get: function (displayObject) {
    var tasks = [], displayObject = displayObject, subflag = false, timeStamp = new Date().getTime() + Math.random(1) * 100;
    var oper = {
      to: function (props, duration, ease, infinite) {
        tasks.push({
          props: props,//end状态值
          initProps: function () {
            var __props = {};
            for (var key in props) {
              __props[key] = displayObject[key];
            }
            return __props;
          }(),//start状态值
          duration: Math.ceil(duration/17),
          ease: ease,
          start: 0
        });

        if (!subflag) {
          subflag = true;
          PubSub.subscribe('__SNANI_rendernotify' + timeStamp, function () {
            var task = tasks[0];
            if (!task) {
              PubSub.unsubscribe('__SNANI_rendernotify' + timeStamp);
              return;
            }
            task.start = task.start + 1;
            if (task.start == task.duration) {
              if (infinite) {
                task.start = 0;
              } else {
                tasks.splice(0, 1);
                var nexttask = tasks[0];
                if (nexttask) {
                  //如果队列中仍存在下个动画，则重置当前精灵对象的属性为下个动画对象的初始值
                  for (var key in nexttask.props) {
                    nexttask.initProps[key] = displayObject[key];
                  }
                  //重置开始时间
                  nexttask.start = 0;
                }
              }
            } else {
              for (var key in task.props) {
                //Math.tween.Cubic.easeIn(timestamp,begin,change,task.duration);//移动
                var beginValue = task.initProps[key],
                  endValue = task.props[key];
                var value = task.ease(task.start,
                  beginValue,
                  endValue - beginValue,
                  task.duration);//移动
                if (key != 'opacity')
                  displayObject[key] = value;
                else {
                  //透明度需要特殊处理，不能为负值
                  displayObject[key] = value <= 0 ? 0 : value;
                }
              }
            }


          });
        }
        return oper;
      }
    };
    return oper;
  }
};
Math.tween = Tween;

export default SNAnimation;


