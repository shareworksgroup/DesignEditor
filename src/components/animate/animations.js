import SNAnimation from './snanimation';
import Moon from 'moon';

const PubSub = Moon.PubSub;

/* eslint-disable */
const Animations = {
  width: 100,
  height: 100,
  init: function (dom) {
    SNAnimation.ImageManager.addImages({
      'gifbg': require('./gif/bg.jpg'),
      'gifflex': require('./gif/flex.png'),
      'gifplane': require('./gif/plane.png'),
      'gifsun': require('./gif/sun.png'),
      'gifyun': require('./gif/yun.png'),
    });
    /*  PubSub.subscribe('__SNANI_SOUNDMANAGER_LOADED',function(){

          SNAnimation.AudioManager.setBackgroundMusic('../audio/music_Mainscene.mp3',{loops:999}).addAudio({
              plane:'../audio/effect_Largeaircraft_clip.mp3'
          });
          
      });*/
    const rect = dom.getBoundingClientRect();
    SNAnimation.Renderer.load(dom);
    this.width = dom.style.width || rect.width;
    this.height = dom.style.height || rect.height;
    var that = this;
    PubSub.subscribe('onorientationchange', function () {
      const rect = dom.getBoundingClientRect();
      that.width = rect.width;
      that.height = rect.height;
    });
    SNAnimation.Renderer.start();
    return this;
  },
  destory: function(){
    SNAnimation.Renderer.clear();
  },
  gif: {
    layer: null,
    remove: function () {
      SNAnimation.Renderer.stop();
      this.layer && this.layer.remove();
    },
    rerun: function () {
      this.flex.x = 85 - 200;
      this.plane.x = -200;
      Math.tween.get(this.plane).to({ x: 180 }, 1000, Math.tween.Linear);
      Math.tween.get(this.flex).to({ x: 265 }, 1000, Math.tween.Linear);
    },
    run: function () {
      this.layer && this.layer.remove();
      //创建一个装载精灵的图层
      this.layer = new SNAnimation.Layer({
        width: 578,//图层宽 
        height: 143,//图层高 
        autorender: true,//是否自动渲染，如果是，初始化好之后便会出现在屏幕上，否则调用start方法之后才会开始渲染
        autostart: true//是否自动开始精灵动画（此精灵动画指的是循环切换图片上的小精灵）
      });
      //创建一个精灵
      var bgsprite1 = new SNAnimation.DisplayObject({
        width: 1081,//精灵图片上一个单位精灵的原始宽
        height: 145,//精灵图片上一个单位精灵的原始高
        drawWidth: 1081,//实际绘制宽度
        drawHeight: 145,//实际绘制高度 比如可以缩放绘制 通过这两个属性结合Math.tween.get().to可以做到放大缩小等动画
        removeWhenEnd: false,//是否动画执行完毕后自动移除
        backgroundImage: 'gifbg'//精灵图片key 由 SNAnimation.ImageManager统一管理
      }).addTo(this.layer);
      //创建一个动画
      SNAnimation.Timer.cycle(bgsprite1, '12fps', {//帧率为12fps
        delay: 0//延时播放
      });

      //创建一个精灵
      var bgsprite2 = new SNAnimation.DisplayObject({
        x: 1075,//精灵的x坐标
        width: 1081,//精灵图片上一个单位精灵的原始宽
        height: 145,//精灵图片上一个单位精灵的原始高
        drawWidth: 1081,//实际绘制宽度
        drawHeight: 145,//实际绘制高度 比如可以缩放绘制 通过这两个属性结合Math.tween.get().to可以做到放大缩小等动画
        removeWhenEnd: false,//是否动画执行完毕后自动移除
        backgroundImage: 'gifbg'//精灵图片key 由 SNAnimation.ImageManager统一管理
      }).addTo(this.layer);
      //创建一个动画
      SNAnimation.Timer.cycle(bgsprite1, '12fps', {//帧率为12fps
        delay: 0//延时播放
      });
      //创建一个动画
      SNAnimation.Timer.cycle(bgsprite2, '12fps', {//帧率为12fps
        delay: 0//延时播放
      });

      // 启动背景循环滚动 此处使用两个背景精灵进行走马灯轮播处理
      //运动辅助，获取一个精灵，使用to方法（类似于jQuery的animate)使精灵运动到某一状态，第二个参数是缓动函数
      Math.tween.get(bgsprite1).to({ x: -1081 }, 6000, Math.tween.Linear, true);
      Math.tween.get(bgsprite2).to({ x: 0 }, 6000, Math.tween.Linear, true);

      //创建太阳精灵
      var sun = new SNAnimation.DisplayObject({
        x: 330,//精灵的x坐标
        y: 20,//y坐标
        width: 22,//精灵图片上一个单位精灵的原始宽
        height: 22,//精灵图片上一个单位精灵的原始高
        drawWidth: 18,//实际绘制宽度
        drawHeight: 18,//实际绘制高度 比如可以缩放绘制 通过这两个属性结合Math.tween.get().to可以做到放大缩小等动画
        removeWhenEnd: false,//是否动画执行完毕后自动移除
        backgroundImage: 'gifsun'//精灵图片key 由 SNAnimation.ImageManager统一管理
      }).addTo(this.layer);
      //太阳不需要动作
      SNAnimation.Timer.cycle(sun, '0fpx');

      //创建飞机精灵
      let x = 180, flexx = 265;
      var plane = this.plane = new SNAnimation.DisplayObject({
        x: 180 - 300,//精灵的x坐标
        y: 50,//y坐标
        width: 108,//精灵图片上一个单位精灵的原始宽
        height: 64,//精灵图片上一个单位精灵的原始高
        drawWidth: 108,//实际绘制宽度
        drawHeight: 64,//实际绘制高度 比如可以缩放绘制 通过这两个属性结合Math.tween.get().to可以做到放大缩小等动画
        removeWhenEnd: false,//是否动画执行完毕后自动移除
        backgroundImage: 'gifplane'//精灵图片key 由 SNAnimation.ImageManager统一管理
      }).addTo(this.layer);
      //飞机不需要动画，飞机扇叶需要动画而已
      SNAnimation.Timer.cycle(plane, '0fpx');

      //创建飞机风扇叶片
      var flex = this.flex = new SNAnimation.DisplayObject({
        x: 265 - 300,//精灵的x坐标
        y: 50,//y坐标
        width: 17,//精灵图片上一个单位精灵的原始宽
        height: 64,//精灵图片上一个单位精灵的原始高
        drawWidth: 17,//实际绘制宽度
        drawHeight: 64,//实际绘制高度 比如可以缩放绘制 通过这两个属性结合Math.tween.get().to可以做到放大缩小等动画
        removeWhenEnd: false,//是否动画执行完毕后自动移除
        horizontal: false,//横向或纵向播放精灵图片上的单位精灵
        backgroundImage: 'gifflex'//精灵图片key 由 SNAnimation.ImageManager统一管理
      }).addTo(this.layer);
      //创建风扇旋转动画
      SNAnimation.Timer.cycle(flex, '24fpx', {//帧率为12fps
        from: 0,//精灵图上起始单位精灵索引 比如从第二张精灵单位开始播放
        to: 3,//精灵图上结束单位精灵索引，比如到第五张精灵单位结束播放
        loop: -1,//循环次数，播放时间长度则由循环次数与帧率共同决定
        delay: 0//延时播放
      });
      Math.tween.get(plane).to({ x }, 1000, Math.tween.Linear);
      Math.tween.get(flex).to({ x: flexx }, 1000, Math.tween.Linear);

      //创建云层精灵
      var cloud1 = new SNAnimation.DisplayObject({
        width: 1081,//精灵图片上一个单位精灵的原始宽
        height: 145,//精灵图片上一个单位精灵的原始高
        drawWidth: 1081,//实际绘制宽度
        drawHeight: 145,//实际绘制高度 比如可以缩放绘制 通过这两个属性结合Math.tween.get().to可以做到放大缩小等动画
        opacity: .8,
        removeWhenEnd: false,//是否动画执行完毕后自动移除
        backgroundImage: 'gifyun'//精灵图片key 由 SNAnimation.ImageManager统一管理
      }).addTo(this.layer);
      //云层动画
      SNAnimation.Timer.cycle(cloud1, '12fps', {//帧率为12fps
        delay: 0//延时播放
      });

      //创建云层精灵
      var cloud2 = new SNAnimation.DisplayObject({
        x: 1075,//精灵的x坐标
        width: 1081,//精灵图片上一个单位精灵的原始宽
        height: 145,//精灵图片上一个单位精灵的原始高
        drawWidth: 1081,//实际绘制宽度
        drawHeight: 145,//实际绘制高度 比如可以缩放绘制 通过这两个属性结合Math.tween.get().to可以做到放大缩小等动画
        opacity: .8,
        removeWhenEnd: false,//是否动画执行完毕后自动移除
        backgroundImage: 'gifyun'//精灵图片key 由 SNAnimation.ImageManager统一管理
      }).addTo(this.layer);
      //云层动画
      SNAnimation.Timer.cycle(cloud1, '12fps', {//帧率为12fps
        delay: 0//延时播放
      });
      //云层动画
      SNAnimation.Timer.cycle(cloud2, '12fps', {//帧率为12fps
        delay: 0//延时播放
      });

      // 启动云层循环滚动 此处使用两个云层精灵进行走马灯轮播处理
      //运动辅助，获取一个精灵，使用to方法（类似于jQuery的animate)使精灵运动到某一状态，第二个参数是缓动函数
      Math.tween.get(cloud1).to({ x: -1081 }, 8000, Math.tween.Linear, true);
      Math.tween.get(cloud2).to({ x: 0 }, 8000, Math.tween.Linear, true);

      this.layer.start();
      SNAnimation.Renderer.addLayer(this.layer);
    }
  },

};

export default Animations;






