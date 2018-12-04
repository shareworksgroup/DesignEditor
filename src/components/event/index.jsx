import React from 'react';

class Event extends React.Component {
  render(){
    return <div className="data-event-table">{this.props.children}</div>;
  }
}

class Item extends React.Component {
  render(){
    const { time, info } = this.props;
    return (<div className="data-event">
      <p>{time}</p>
      <h5>{info}</h5>
    </div>);
  }
}

Event.Item = Item;
export default Event;