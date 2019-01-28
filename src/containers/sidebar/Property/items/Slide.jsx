import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const Slide = ({ title = "Width", value = 100, attribute = 'width', onUpdate = () => { } }) => (<div className="ds-widget ds-link-widget">
  <div className="row">
    <div className="ds-widget-label col-6">
      <label className="ds-label-primary"><span>{title}</span></label>
    </div>
    <div className="col-6">
      <Slider trackStyle={{ backgroundColor: '#007BFF' }} handleStyle={{ borderColor: '#4094EF' }} value={value} onChange={(val) => { onUpdate(attribute, val) }} />
    </div>
  </div>
</div>);

export default Slide;