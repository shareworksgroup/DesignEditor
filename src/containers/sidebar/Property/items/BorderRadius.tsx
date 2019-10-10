import React from 'react';
import { Number } from '../../../../components';

const BorderRadius = ({ borderRadius = 4, title = "Rounded Border", onUpdate = () => { } }: IBorderRadiusProps) => (
  <div className="ds-widget ds-link-widget">
    <div className="row">
      <div className="ds-widget-label col-6">
        <label className="ds-label-primary"><span>{title}</span></label>
      </div>
      <div className="col-6 text-right">
        <Number max={100} step={1} value={borderRadius} onChange={val => { onUpdate('borderRadius', val); }} />
      </div>
    </div>
  </div>);

interface IBorderRadiusProps {
  borderRadius?: number;
  title?: string;
  onUpdate?: onUpdate;
}

export default BorderRadius;