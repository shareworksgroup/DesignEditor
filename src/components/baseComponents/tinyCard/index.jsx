import React from 'react';
import classnames from 'classnames';

class TinyCard extends React.Component {
  render() {
    const { className, style, iconClass, title, desc, onClick } = this.props;
    return (
      <section className={classnames('ui-tinycard', className)} style={style} onClick={onClick}>
        <div class="number">
          <i class={iconClass} />
          <span>{title}</span>
        </div>
        <div class="text">{desc}</div>
      </section>);
  }
}

export default TinyCard;