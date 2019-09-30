import React from 'react';
import { Fonts } from '../../../../lib/enum';

const Font = ({ title, fontFamily, onUpdate = () => { } }: IFontProps) => (
  <div className="ds-widget ds-link-widget">
    <div className="row">
      <div className="ds-widget-label col-6">
        <label className="ds-label-primary"><span>{title}</span></label>
      </div>
      <div className="col-6">
        <select className="form-control form-control-sm" value={fontFamily} onChange={(e) => { onUpdate('fontFamily', e.target.value) }}>
          {
            Object.keys(Fonts).map(i => <option key={i} value={Fonts[i]}>{i}</option>)
          }
        </select>
      </div>
    </div>
  </div>);

interface IFontProps {
  title?: string;
  fontFamily?: string;
  onUpdate?: onUpdate;
}

export default Font;