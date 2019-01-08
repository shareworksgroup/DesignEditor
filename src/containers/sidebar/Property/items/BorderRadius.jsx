import React from 'react';
import { Input, Align, Number } from '../../../../components';

class BorderRadius extends React.Component {
  render(){
    const { borderRadius = 4, title = "Rounded Border" , onUpdate= () => {}} = this.props;
    return <div className="blockbuilder-widget blockbuilder-link-widget">
    <div className="row">
      <div className="blockbuilder-widget-label col-6">
        <label className="blockbuilder-label-primary"><span>{title}</span></label>
      </div>
      <div className="col-6">
        <Number max={20} step={1} value={borderRadius} onChange={(val)=>{onUpdate('borderRadius', val)}} />
      </div>
    </div>
  </div>;
  }
}

export default BorderRadius;