import React from 'react';
import { Line } from '../../../../components';

const LineItem = ({ title = "Line", lineWidth, lineStyle, lineColor, onUpdate = () => { } }: ILineItemProps) => (
  <div className="ds-widget ds-link-widget">
    <div className="row">
      <div className="ds-widget-label col-6">
        <label className="ds-label-primary"><span>{title}</span></label>
      </div>
      <div className="col-6">
        <Line lineWidth={lineWidth} lineStyle={lineStyle} lineColor={lineColor} onUpdate={(key, val) => { onUpdate(key, val); }} />
      </div>
    </div>
  </div>);

interface ILineItemProps {
  title?: string;
  lineWidth?: number;
  lineStyle?: string;
  lineColor?: string;
  onUpdate?: onUpdate;
}

export default LineItem;