import React from 'react';

class Card extends React.Component {
  render() {
    const { children, title, id } = this.props;
    return <div id={id} class="hq-card">
      <h4 class="hq-header">{title}</h4>
      <div class="hq-body">
        {children}
      </div>
    </div>;
  }
}

export default Card;