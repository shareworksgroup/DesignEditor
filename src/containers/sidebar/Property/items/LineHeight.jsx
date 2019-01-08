import React from 'react';
import { Input, Align, Number } from '../../../../components';

class LineHeight extends React.Component {
  render(){
    const { lineHeight = 120, title = "Line Height" , onUpdate= () => {}} = this.props;
    return <div className="blockbuilder-widget blockbuilder-link-widget">
    <div className="row">
      <div className="blockbuilder-widget-label col-6">
        <label className="blockbuilder-label-primary"><span>{title}</span></label>
      </div>
      <div className="col-6">
        <Number max={1000} step={10} formatter={val => `${val}%`} parser={val => val.replace('%', '')} value={lineHeight} onChange={(val)=>{onUpdate('lineHeight', val)}} />
      </div>
    </div>
  </div>;
  }
}

export default LineHeight;