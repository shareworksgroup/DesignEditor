import React from 'react';
import ColorPicker from 'rc-color-picker';
import { rgb2rgba, rgba2rgb } from '../../../../lib/util';
import { IRGBA } from '../../../../schemas/common';
import 'rc-color-picker/assets/index.css';

const Color = ({ title = 'Color', value = '#fff', attribute = 'color', onUpdate = () => { } }: IColorProps) => {
  const rgba: IRGBA = rgba2rgb(value);
  return <div className="ds-widget ds-link-widget">
    <div className="card-row">
      <div className="ds-widget-label col-6">
        <label className="ds-label-primary"><span>{title}</span></label>
      </div>
      <div className="col-6 text-right">
        <ColorPicker color={rgba.rgb} alpha={rgba.alpha} onChange={e => { onUpdate(attribute, rgb2rgba(e.color, e.alpha)); }} />
      </div>
    </div>
  </div>;
};

interface IColorProps {
  title?: string;
  value?: string;
  attribute?: string;
  onUpdate?: onUpdate;
}

export default Color;