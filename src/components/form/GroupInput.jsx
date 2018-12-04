import React from 'react';
import classnames from 'classnames';
import styles from './GroupInput.less';

class GroupInput extends React.Component {

  constructor(props) {
    super(props);
  }

  focus(){
    this.dom && this.dom.focus();
  }

  onChange = (e) => {
    const { onChange = () => {} } = this.props;
    const value = e.target.value;
    onChange(value);
  }

  render(){
    const { label, required, component, error } = this.props;
    return <div class={classnames("form-group", error && 'has-error')}>
        {label && <label>{label} {required && '*'}</label>}
        {(component && React.cloneElement(component,
          {...this.props,
            onChange: this.onChange,
            ref: (dom) => {this.dom = dom;}})) ||
          <input type="text" class="form-control input-sm" ref={(dom) => { this.dom = dom; }} {...this.props} onChange={this.onChange}/>}
      </div>;
  }
}

export default GroupInput;