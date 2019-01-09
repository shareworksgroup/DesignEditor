import React from 'react';
import { Input, Align, Number } from '../../../../components';

const Link = ({ title, linkType, link, onUpdate = () => {}}) => (<div className="blockbuilder-widget blockbuilder-link-widget">
    <div className="row">
      <div className="blockbuilder-widget-label col-6">
        <label className="blockbuilder-label-primary"><span>{title}</span></label>
      </div>
      <div className="col-6">
        <select className="form-control form-control-sm" value={linkType} onChange={(e)=>{onUpdate('linkType', e.target.value)}}>
          <option value="_self">Same Tab</option>
          <option value="_blank">New Tab</option>
        </select>
      </div>
    </div>
    <div className="row" style={{marginTop:10}}>
      <div className="col-12">
        <Input addOn="URL" onChange={(e)=>{onUpdate('link', e.target.value)}} value={link} />
      </div>
    </div>
</div>);

export default Link;