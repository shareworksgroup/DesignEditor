import React from 'react';
import { Number } from '../../../../components';

const BorderRadius = ({ borderRadius = 4, title = "Rounded Border", onUpdate = () => { } }) => (<div className="blockbuilder-widget blockbuilder-link-widget">
  <div className="row">
    <div className="blockbuilder-widget-label col-6">
      <label className="blockbuilder-label-primary"><span>{title}</span></label>
    </div>
    <div className="col-6 text-right">
      <Number max={100} step={1} value={borderRadius} onChange={(val) => { onUpdate('borderRadius', val) }} />
    </div>
  </div>
</div>);

export default BorderRadius;