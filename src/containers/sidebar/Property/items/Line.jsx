import React from 'react';
import { Line } from '../../../../components';


const LineItem = ({ title = "Line", lineWidth, lineStyle, lineColor, onUpdate = () => { } }) => (<div className="blockbuilder-widget blockbuilder-link-widget">
  <div className="row">
    <div className="blockbuilder-widget-label col-6">
      <label className="blockbuilder-label-primary"><span>{title}</span></label>
    </div>
    <div className="col-6">
      <Line lineWidth={lineWidth} lineStyle={lineStyle} lineColor={lineColor} onUpdate={(key, val) => { onUpdate(key, val) }} />
    </div>
  </div>
</div>);

export default LineItem;