import React from 'react';
import classnames from 'classnames';
import styles from './FocusInput.less';

class FocusInput extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount(){
    const { onRef = () => {} } = this.props;
    onRef(this);
  }

  onChange = (e) => {
    const { onChange = () => {} } = this.props;
    const value = e.target.value;
    onChange(value);
  }

  focus(){
    this.input && this.input.focus();
  }

  render(){
    const { placeholder, maxlength = null, required, value, error } = this.props;
    return <div className={classnames("focus-input", "group", error && 'has-error')} >
        <input type="text"
          value={value}
          ref={(dom)=>{this.input = dom;}}
          className={classnames(value && 'up')}
          maxlength={maxlength}
          required={required}
          onChange={this.onChange}/>
        <span class="highlight"></span>
        <span class="bar"></span>
        <label>{placeholder}</label>
    </div>;
  }
}

export default FocusInput;