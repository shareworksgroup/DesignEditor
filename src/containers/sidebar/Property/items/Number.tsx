import React from 'react';
import { Number } from '../../../../components';

const NumberItem = ({ title, value, step = 50, max = 1000, min = 0, attribute, onUpdate = () => { } }: INumberItemProps) => (
  <div className="ds-widget ds-link-widget">
    <div className="row">
      <div className="ds-widget-label col-6">
        <label className="ds-label-primary"><span>{title}</span></label>
      </div>
      <div className="col-6 text-right">
        <Number max={max} min={min} step={step} value={value} onChange={(val) => { onUpdate(attribute, val) }} />
      </div>
    </div>
  </div>);

interface INumberItemProps {
  title?: string;
  value?: number;
  step?: number;
  max?: number;
  min?: number;
  attribute?: string;
  onUpdate?: onUpdate;
}

export default NumberItem;