import React from 'react';
import { Input } from '../../../../components';

const InputItem = ({ title, value, attribute, desc, onUpdate = () => { } }) => (<div className="blockbuilder-widget blockbuilder-link-widget">
  <div className="row">
    <div className="blockbuilder-widget-label col-6">
      <label className="blockbuilder-label-primary"><span>{title}</span></label>
    </div>
  </div>
  <div className="row" style={{ marginTop: 10 }}>
    <div className="col-12">
      <Input onChange={(e) => { onUpdate(attribute, e.target.value) }} value={value} />
      {desc && <div className="blockbuilder-widget-hint">
        {desc}
      </div>}
    </div>
  </div>
</div>);

export default InputItem;