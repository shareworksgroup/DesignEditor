import React from 'react';
import classnames from 'classnames';
import CountUp from 'react-countup';
import Moon from '../../lib/moon';

class TinyCard extends React.Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    this.props.onClick && this.props.onClick.apply(this, [e, this.props]);
  }

  render() {
    const fn = () => { };
    const { title, info, iconClass = "mdi-communication-email", className, style } = this.props;
    return <a href="javascript:void(0)" target="_blank" style={style} className={classnames("grid-item", className)} onClick={this.onClick}>
      <span className="number">
        <i className={iconClass}></i>
        {Moon.type(title) === Moon.Types.Number ? <CountUp start={0} end={title} duration={2} /> : (<span>{title}</span>)}
      </span>
      <span className="text">
        {info}
      </span>
    </a>;
  }
}

export default TinyCard;