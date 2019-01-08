import React from 'react';
import ColorPicker from 'rc-color-picker';
import ColorPickerStyle from 'rc-color-picker/assets/index.css';

class Color extends React.Component {
  render(){
    const { title = 'Colors', colors = {}, onUpdate = () => {}} = this.props;
    const { textColor, backgroundColor, hoverColor } = colors;
    return <div className="blockbuilder-widget blockbuilder-link-widget">
    <div className="row">
      <div className="blockbuilder-widget-label col-6">
        <label className="blockbuilder-label-primary"><span>{title}</span></label>
      </div>
    </div>
    <div className="row" style={{marginTop:10}}>
      {textColor && <div className="col-6">
        <div className="blockbuilder-widget-label"><label><span>Text Color</span></label></div>
        <div className="blockbuilder-color-picker"><ColorPicker color={textColor} onChange={(e)=>{onUpdate('textColor', e.color)}}/></div>
      </div>}
      { backgroundColor && <div className="col-6">
        <div className="blockbuilder-widget-label"><label><span>Background Color</span></label></div>
        <div className="blockbuilder-color-picker"><ColorPicker color={backgroundColor} onChange={(e)=>{onUpdate('backgroundColor', e.color)}}/></div>
      </div>}
      { hoverColor && <div className="col-6">
        <div className="blockbuilder-widget-label"><label><span>Hover Color</span></label></div>
        <div className="blockbuilder-color-picker"><ColorPicker color={hoverColor} onChange={(e)=>{onUpdate('hoverColor', e.color)}} /></div>
      </div>}
    </div>
  </div>;
  }
}

export default Color;