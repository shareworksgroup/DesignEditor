import React from 'react';
import styles from './index.less';

class Input extends React.Component {
  render(){
    const { addOn, value, onChange } = this.props;
    const inputStyle = addOn ? {} : { borderRadius:'0.25rem'};
    return <div className="input-group">
    {addOn && <div className="input-group-prepend">
      <span className="input-group-text">{addOn}</span>
    </div>}
    <input type="text" style={inputStyle} value={value} onChange={onChange} className="form-control" />
  </div>;
  }
}

export default Input;