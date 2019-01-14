import React from 'react';
import classnames from 'classnames';
import ColorPicker from 'rc-color-picker';
import ColorPickerStyle from 'rc-color-picker/assets/index.css';
import styles from './index.less';
import Number from './Number';
import { rgb2rgba, rgba2rgb } from '../../lib/util';
import { IRGBA } from '../../schemas/common';

class Line extends React.Component {
  render() {
    const { lineWidth, lineStyle, lineColor, onUpdate } = this.props;
    const rgba = rgba2rgb(lineColor);
    console.log(lineColor, rgba.rgb, rgba.alpha);
    return <React.Fragment>
      <select className="form-control" value={lineStyle} onChange={(e)=>{onUpdate('lineStyle', e.target.value)}}>
        <option value="solid">Solid</option>
        <option value="dotted">Dotted</option>
        <option value="dashed">Dashed</option>
      </select>
      <div style={{ marginTop: 5 }}>
        <div style={{display:'inline-block', verticalAlign:'top'}}><Number max={20} min={1} step={1} value={lineWidth} onChange={(val)=>{onUpdate('lineWidth', val)}} /></div>
        <div style={{display:'inline-block', marginLeft: 30}}><ColorPicker color={rgba.rgb} alpha={rgba.alpha} onChange={(e)=>{onUpdate('lineColor', rgb2rgba(e.color, e.alpha))}}/></div>
      </div>
    </React.Fragment>
  }
}

export default Line;