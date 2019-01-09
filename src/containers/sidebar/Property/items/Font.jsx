import React from 'react';

const Fonts = [
  "MicroSoft Yahei",
  "'ZCOOL KuaiLe', cursive",
  "'Slabo 27px', serif",
  "'Source Sans Pro', sans-serif",
  "'Roboto Condensed', sans-serif",
  "'Sarabun', sans-serif",
  "'Oswald', sans-serif",
  "'Charm', cursive",
  "'Open Sans Condensed', sans-serif",
  "'Ubuntu', sans-serif",
  "'Poppins', sans-serif",
  "'ZCOOL XiaoWei', serif",
  "'ZCOOL QingKe HuangYou', cursive"
];

const Font = ({ title, fontFamily, onUpdate = () => {}}) => (<div className="blockbuilder-widget blockbuilder-link-widget">
    <div className="row">
      <div className="blockbuilder-widget-label col-6">
        <label className="blockbuilder-label-primary"><span>{title}</span></label>
      </div>
      <div className="col-6">
        <select className="form-control form-control-sm" value={fontFamily} onChange={(e)=>{onUpdate('fontFamily', e.target.value)}}>
          {
            Fonts.map(i => <option key={i} value={i}>{i}</option>)
          }
        </select>
      </div>
    </div>
</div>);

export default Font;