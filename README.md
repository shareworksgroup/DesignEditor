# Design Editor
## 主要目的是用React实现一个邮件模板编辑器
 灵感（或者说需求）来源于EmailHQ项目，该项目目前使用的邮件模板编辑器是[GrapesJS][1]，GrapesJS是一个开源的、多用途的Web Builder框架，它结合了不同的工具和特性，目的是帮助用户在不了解任何编码的情况下构建HTML模板。它是替换普通所见即所得编辑器的完美解决方案，这些编辑器适合于内容编辑，但不适用于创建HTML结构。但是其功能太过复杂，需要进行定制的内容太多，所有使用体验不是很好（过于复杂且专业）。
 
 基于此，我萌生出想用React实现一个邮件模板编辑器的想法，参照原型为[unlayer][2]，这是一个商业软件，基于服务收费。
 
 该项目完成后，能应用于多个有此需求场景的公司项目中。


  [1]: https://grapesjs.com/
  [2]: https://unlayer.com/
  [3]: https://design-editor-93157.firebaseapp.com/index.html
  
  [DEMO][3]


  ## 使用说明
 
  1. 目前暂时不打算支持npm，clone到本地`npm install`之后执行`npm run start`可预览功能；
  执行`npm run build`可构建输出，项目引用方式可以通过其它项目运行`npm install 此项目路径` 进行安装
  2. 由于使用了tinymce导致包体积比较庞大，一般设计器都如此，避免不了。
  3. 图片上传需要自己提供后端服务，此项目提供了一个代理程序可以试用，
    使用`cd mocks`然后`node proxy [username] [password]`即可代理smsone系统dev环境的上传接口

  ### 属性
|   属性名        |     功能    |
|   --------   |    -----:    |
|   imageUploadUrl     |     提供图片上传地址  |
|   mentions     |     提供动态字段提示列表 [{key,title}] （填充key值）  |

  ### 回调方法
|   方法名        |     功能    |   参数    |   返回值    |
|   --------   |    -----:    |   -----   |   -----     |
|   ref     |     用于获取编辑器instance  |     编辑器instance    |   无    |
|   onUpload     |     图片上传完成处理数据格式  |    服务端返回的数据    |   实际图片地址    |
|   onUploadError     |     捕获图片上传失败异常信息  |   error: { message: string, errorStack: string }  |   无  |

  ### instance方法
|   方法名        |     功能    |   参数    |   返回值    |
|   --------   |    -----:    |   -----   |   -----     |
|   export     |     将当前内容转换成html导出  |     无    |   html:string    |
|   getData     |     获取当前内容的原始数据rawData  |    无    |   rawData:Object    |
|   setData     |     将原始数据设置回编辑器  |   rawData:Object  |   无  |

  ### 关于Content组件扩展

  在编码前的设计阶段，我就构想了Content扩展，包括Content图标，标题，编辑区如何展示，如何提供属性编辑器列表等等。<br>
  扩展方式如下（以Video为例）：

```javascript

import React from 'react';
import DesignEditor, { Extension, PropertyWidget, PropertyGroup } from 'design-editor';

const { Space, Align, Input, Switch } = PropertyWidget;
class Video extends Extension {
    getIconClass() {
      return 'mdi-maps-local-movies';
    }

    getContentType() {
      return 'video';
    }

    getLabel() {
      return 'Video';
    }

    toHtml(data) {
      const { url, containerPadding, textAlign, fullWidth } = data;
      const videoStyle = fullWidth ? ` width: 100% ` : ` maxWidth: 100% `;
      return `<div style="padding:${containerPadding}">
        <div style="text-align:${textAlign}">
          <video controls src="${url}" style="${videoStyle}" />
        </div>
      </div>`;
    }

    getInitialAttribute() {
      return {
        containerPadding: '10px',
        textAlign: 'center',
        fullWidth: false,
        url: ''
      };
    }

    getProperties(values, update) {
      const { url, textAlign, containerPadding, fullWidth } = values;
      return <React.Fragment>
        <PropertyGroup title="LINK">
          <Input title="Video URL" value={url} attribute="url" desc="Add a YouTube or Vimeo URL to automatically generate a preview image. The image will link to the provided URL." onUpdate={update} />
        </PropertyGroup>
        <PropertyGroup title="SPACING">
          <Switch title="Full Width" checked={fullWidth} attribute="fullWidth" onUpdate={update} />
          <Align title="Align" align={textAlign} onUpdate={update} />
        </PropertyGroup>
        <PropertyGroup title="GENERAL">
          <Space title="Container Padding" value={containerPadding} attribute="containerPadding" onUpdate={update} />
        </PropertyGroup>
      </React.Fragment>
    }


    render() {
      const { url, containerPadding, textAlign, fullWidth } = this.props;
      const videoStyle = fullWidth ? { width: '100%' } : { maxWidth: '100%' };
      return <div className="ds_content_video"
        style={{
          padding: containerPadding,
        }}
      >
        <div style={{
          textAlign
        }}>
          {url ? <video controls src={url} style={videoStyle} /> : <p><i className="mdi-av-play-arrow"></i></p>}
        </div>
      </div>;
    }
}

export default Video;

```

然后，直接将Video组件放置于DesignEditor组件内部即可，如有多个扩展，显示时会按照放置顺序进行输出：

```javascript
<DesignEditor
  imageUploadUrl="http://localhost:3001/NewUserFeedback/upload"
  mentions={[
    { key: 'key', title: 'title' },
  ]}
  onUpload={data => data.fileUrl}
  onUploadError={error => console.log('5555', error.message)}
  ref={(obj) => { instance = obj; window.instance = obj; }}>
  <Video />
</DesignEditor>

```

之所以继承自Extension类，是因为需要规范几个方法，如下所示：
  ### Extension方法
|   方法名        |     功能    |   参数    |   返回值    |
|   --------   |    -----:    |   -----   |   -----     |
|   getIconClass     |     提供扩展图标样式  |     无    |   iconClass:string    |
|   getLabel     |     提供扩展标题  |    无    |   label:string    |
|   getContentType     |     提供扩展类型名称（需要保证唯一，除button divider html image text外）  |  无   |   contentType:string  |
|   toHtml     |     提供toHtml转换功能  |    扩展的所有属性    |   根据属性生成扩展html片段    |
|   getInitialAttribute     |     提供初始属性对象  |    无    |   Attribute:Object    |
|   getProperties     |     提供属性编辑器片段  |    (values: Object 属性对象, update:(key, value) => {}  更新方法)    |   ReactNode    |
|   render     |     提供渲染片段  |    props: { ...所有扩展的属性, focus: boolean 编辑区域中是否选中当前扩展 }    |   ReactNode    |

  ### 属性编辑组件列表
  内置一些属性编辑组件如下：

|   组件        |     功能    |   使用示例    |
|   --------   |    -----    |   ------    |
|   Link     |     配置链接  |    ```<Link link={link} linkType={linkType} title="Button Link" onUpdate={update} />```    |
|   Colors     |     配置三项颜色，color+backgroundColor+hoverColor（可选）  |   ```<Colors title="Colors" colors={{ color, backgroundColor, hoverColor }} onUpdate={update} />```    |
|   Align     |     对齐  |   ```<Align align={textAlign} onUpdate={update} />```     |
|   LineHeight     |     行高  |   ```<LineHeight lineHeight={lineHeight} onUpdate={update} />```     |
|   BorderRadius     |     圆角  |    ```<BorderRadius borderRadius={borderRadius} onUpdate={update} />```    |
|   Color     |     颜色  |   ```<Color title="Color" value={color} attribute="color" onUpdate={update} />```     |
|   Switch     |     toggle开关  |    ```<Switch title="Full Width" checked={fullWidth} attribute="fullWidth" onUpdate={update} />```    |
|   Space     |     四周空间配置，用于margin padding等  |    ```<Space title="Padding" value={padding} attribute="padding" onUpdate={update} />```    |
|   Slide     |     滑块  |    ```<Slide title="Width" attribute="width" value={width} onUpdate={update} />```    |
|   Line     |     边框效果配置，包括边框样式颜色与粗细  |   ```<Line title="Line" lineWidth={lineWidth} lineStyle={lineStyle} lineColor={lineColor} onUpdate={update} />```     |
|   HtmlEditor     |     Html源码编辑  |    ```<HtmlEditor style={{ margin: '-15px -20px' }} value={html} onChange={(value) => { update('html', value) }} />```    |
|   Input     |     普通输入框，参见Image的Url  |     ```<Input addOn="URL" onChange={(e) => { onUpdate('link', e.target.value) }} value={link} /> <Input title="Video URL" value={url} attribute="url" desc="Add a YouTube or Vimeo URL to automatically generate a preview image. The image will link to the provided URL." onUpdate={update} />```   |
|   ImageEditor     |     图片上传组件  |    ```<ImageEditor key={values._meta.guid} attribute="url" onUpdate={update} />```    |
|   NumberItem     |     左右加减操作数字  |   ```<NumberItem title="Content Width" value={width} attribute="width" onUpdate={onUpdate} />```     |
|   Font     |     字体选择  |   ```<Font title="Font Family" fontFamily={fontFamily} onUpdate={onUpdate} />```     |

  若有其它需求，需要另外开发。