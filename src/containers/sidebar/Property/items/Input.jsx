import React from 'react';
import { Input } from '../../../../components';

const InputItem = ({ title, value, attribute, desc, onUpdate = () => { } }) => (<div className="ds-widget ds-link-widget">
  <div className="row">
    <div className="ds-widget-label col-6">
      <label className="ds-label-primary"><span>{title}</span></label>
    </div>
  </div>
  <div className="row" style={{ marginTop: 10 }}>
    <div className="col-12">
      <Input onChange={(e) => { onUpdate(attribute, e.target.value) }} value={value} />
      {desc && <div className="ds-widget-hint">
        {desc}
      </div>}
    </div>
  </div>
</div>);

export default InputItem;