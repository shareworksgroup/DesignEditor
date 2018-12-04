import React from 'react';
import moment from 'moment';
import styles from './index.less';

class Clock extends React.Component {

  constructor(props){
    super(props);
    this.timer = null;
  }
  
  state = {
    hour: 0,
    minute: 0,
    second: 0
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
    const now = moment();
    this.setState({
      second: now.seconds() * 6,
      minute: now.minutes() * 6 + second / 60,
      hour: ((now.hours() % 12) / 12) * 360 + 90 + minute / 12,
    });
  }
  
  render(){
    const { now } = this.props;
    return <div class="hero-circle">
      <div class="hero-face">
        <div id="hour" class="hero-hour" style={{transform: `rotate(${(now && now.hours()) || this.state.hour}deg)`}} />
        <div id="minute" class="hero-minute" style={{transform: `rotate(${(now && now.minutes()) || this.state.minute}deg)`}} />
        <div id="second" class="hero-second" style={{transform: `rotate(${(now && now.seconds()) || this.state.second}deg)`}} />
      </div>
    </div>;
  }
}

export default Clock;