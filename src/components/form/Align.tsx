import React from 'react';
import classnames from 'classnames';
import './index.less';

class Align extends React.Component<IAlignProps> {
  render() {
    const { align, onChange } = this.props;
    return <div className="align-item">
      <a className={classnames({ active: align === 'left' })} onClick={() => { onChange('left'); }}>
        <i className="icon icon-align-to-left" />
      </a>
      <a className={classnames({ active: align === 'center' })} onClick={() => { onChange('center'); }}>
        <i className="icon icon-center-text-alignment" />
      </a>
      <a className={classnames({ active: align === 'right' })} onClick={() => { onChange('right'); }}>
        <i className="icon icon-align-to-right" />
      </a>
    </div>;
  }
}

interface IAlignProps {
  align?: TextAlgin;
  onChange?: (align: TextAlgin) => void;
}

export default Align;