import React from 'react';
import { Align } from '../../../../components';

const AlignItem = ({ align = 'center', title = "Alignments", onUpdate = () => { } }: IAlignItemProps) => (<div className="ds-widget ds-link-widget">
  <div className="card-row">
    <div className="ds-widget-label col-6">
      <label className="ds-label-primary"><span>{title}</span></label>
    </div>
    <div className="col-6">
      <Align align={align} onChange={align => { onUpdate('textAlign', align); }} />
    </div>
  </div>
</div>);

interface IAlignItemProps {
  align?: TextAlgin;
  title?: string;
  onUpdate?: onUpdate;
}

export default AlignItem;