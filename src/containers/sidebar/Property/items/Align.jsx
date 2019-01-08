import React from 'react';
import { Input, Align, Number } from '../../../../components';

class AlignItem extends React.Component {
  render(){
    const { align = 'center', title = "Alignments" , onUpdate= () => {}} = this.props;
    return <div className="blockbuilder-widget blockbuilder-link-widget">
    <div className="row">
      <div className="blockbuilder-widget-label col-6">
        <label className="blockbuilder-label-primary"><span>{title}</span></label>
      </div>
      <div className="col-6">
        <Align align={align} onChange={(align) => {onUpdate('textAlign', align)}} />
      </div>
    </div>
  
  </div>;
  }
}

export default AlignItem;