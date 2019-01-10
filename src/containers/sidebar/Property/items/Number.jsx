import React from 'react';
import { Input, Align, Number } from '../../../../components';

const NumberItem = ({ title, value, step = 50, max = 1000, min = 0, attribute, onUpdate= () => {}}) => (<div className="blockbuilder-widget blockbuilder-link-widget">
    <div className="row">
      <div className="blockbuilder-widget-label col-6">
        <label className="blockbuilder-label-primary"><span>{title}</span></label>
      </div>
      <div className="col-6 text-right">
        <Number max={max} min={min} step={step} value={value} onChange={(val)=>{onUpdate(attribute, val)}} />
      </div>
    </div>
</div>);

export default NumberItem;