import React from 'react';
import Switch from "react-switch";

const SwitchItem = ({ title = 'Do Not Stack on Mobile', checked = false, attribute = 'noStackMobile', onUpdate = () => { } }) => (<div className="ds-widget ds-link-widget">
  <div className="row">
    <div className="ds-widget-label col-12">
      <label className="ds-label-primary">
        <span style={{ marginRight: 10 }}>{title}</span>
        <div style={{ verticalAlign: 'middle', display: 'inline-block' }}><Switch checked={checked} onChange={(checked) => { onUpdate(attribute, checked) }} height={17} width={34} /></div>
      </label>
    </div>
  </div>
</div>);

export default SwitchItem;