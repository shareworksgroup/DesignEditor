import React from 'react';
import { Number } from '../../../../components';

const LineHeight = ({ lineHeight = 120, title = "Line Height", onUpdate = () => { } }) => (<div className="blockbuilder-widget blockbuilder-link-widget">
  <div className="row">
    <div className="blockbuilder-widget-label col-6">
      <label className="blockbuilder-label-primary"><span>{title}</span></label>
    </div>
    <div className="col-6 text-right">
      <Number max={1000} step={10} formatter={val => `${val}%`} parser={val => val.replace('%', '')} value={lineHeight} onChange={(val) => { onUpdate('lineHeight', val) }} />
    </div>
  </div>
</div>);

export default LineHeight;