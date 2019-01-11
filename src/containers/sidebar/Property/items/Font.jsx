import React from 'react';
import { Fonts } from '../../../../lib/enum';

const Font = ({ title, fontFamily, onUpdate = () => {}}) => (<div className="blockbuilder-widget blockbuilder-link-widget">
    <div className="row">
      <div className="blockbuilder-widget-label col-6">
        <label className="blockbuilder-label-primary"><span>{title}</span></label>
      </div>
      <div className="col-6">
        <select className="form-control form-control-sm" value={fontFamily} onChange={(e)=>{onUpdate('fontFamily', e.target.value)}}>
          {
            Object.keys(Fonts).map(i => <option key={i} value={Fonts[i]}>{i}</option>)
          }
        </select>
      </div>
    </div>
</div>);

export default Font;