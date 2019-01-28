import React from 'react';
import ColorPicker from 'rc-color-picker';
import ColorPickerStyle from 'rc-color-picker/assets/index.css';
import { rgb2rgba, rgba2rgb } from '../../../../lib/util';

const Colors = ({ title = 'Colors', colors: { color, backgroundColor, hoverColor, hoverBackgroundColor }, onUpdate = () => { } }) => {
  const colorRgba = rgba2rgb(color);
  const backgroundColorRgba = rgba2rgb(backgroundColor);
  const hoverColorRgba = rgba2rgb(hoverColor);
  const hoverBackgroundColorRgba = rgba2rgb(hoverBackgroundColor);
  return <div className="ds-widget ds-link-widget">
  <div className="row">
    <div className="ds-widget-label col-6">
      <label className="ds-label-primary"><span>{title}</span></label>
    </div>
  </div>
  <div className="row" style={{ marginTop: 10 }}>
    {color && <div className="col-6">
      <div className="ds-widget-label"><label><span>Text Color</span></label></div>
      <div className="ds-color-picker"><ColorPicker color={colorRgba.rgb} alpha={colorRgba.alpha} onChange={(e) => { onUpdate('color', rgb2rgba(e.color, e.alpha)) }} /></div>
    </div>}
    {backgroundColor && <div className="col-6">
      <div className="ds-widget-label"><label><span>Background Color</span></label></div>
      <div className="ds-color-picker"><ColorPicker color={backgroundColorRgba.rgb} alpha={backgroundColorRgba.alpha} onChange={(e) => { onUpdate('backgroundColor', rgb2rgba(e.color, e.alpha)) }} /></div>
    </div>}
    {hoverColor && <div className="col-6">
      <div className="ds-widget-label"><label><span>Hover Color</span></label></div>
      <div className="ds-color-picker"><ColorPicker color={hoverColorRgba.rgb} alpha={hoverColorRgba.alpha} onChange={(e) => { onUpdate('hoverColor', rgb2rgba(e.color, e.alpha)) }} /></div>
    </div>}
    {hoverBackgroundColor && <div className="col-6">
      <div className="ds-widget-label"><label><span>Hover Background Color</span></label></div>
      <div className="ds-color-picker"><ColorPicker color={hoverBackgroundColorRgba.rgb} alpha={hoverBackgroundColorRgba.alpha} onChange={(e) => { onUpdate('hoverBackgroundColor', rgb2rgba(e.color, e.alpha)) }} /></div>
    </div>}
  </div>
</div>;
}

export default Colors;