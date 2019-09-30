import React from 'react';
import { Number } from '../../../../components';

const LineHeight = ({ lineHeight = 120, title = "Line Height", onUpdate = () => { } }: ILineHeightProps) => (<div className="ds-widget ds-link-widget">
  <div className="row">
    <div className="ds-widget-label col-6">
      <label className="ds-label-primary"><span>{title}</span></label>
    </div>
    <div className="col-6 text-right">
      <Number max={1000} step={10} formatter={val => `${val}%`} parser={val => val.replace('%', '')} value={lineHeight} onChange={(val) => { onUpdate('lineHeight', val) }} />
    </div>
  </div>
</div>);

interface ILineHeightProps {
  lineHeight?: number;
  title?: string;
  onUpdate?: onUpdate;
}

export default LineHeight;