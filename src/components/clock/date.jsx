import React from 'react';
import moment from 'moment';
import styles from './index.less';

class Date extends React.Component {

  constructor(props){
    super(props);
    this.timer = null;
  }
  
  state = {
    now: moment(),
  }

  componentDidMount(){
    if (!this.props.now) {
      this.timer = setInterval(this.compute, 1000);
      this.compute();
    }
  }
  
  componentWillUnmount(){
    clearInterval(this.timer);
  }
  
  compute = () => {
    this.setState({now: moment()});
  }
  
  render(){
    const { now } = this.props; // now moment 
    const date = now ? now.format('MMMM Do, YYYY') : this.state.now.format('MMMM Do, YYYY');
    const time = now ? now.format('h:mm:ss A') : this.state.now.format('h:mm:ss A');
    return <div className="clock_date">
      <h5>{date}</h5>
      <p>{time}</p>
    </div>;
  }
}

export default Date;