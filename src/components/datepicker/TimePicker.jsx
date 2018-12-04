import React from 'react';
import classnames from 'classnames';
import moment from 'moment';

class TimePicker extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    if (this.dom && $) {
      const props = this.props;
      $(this.dom).timepicker({
        stepMinute: 15,
        timeFormat: "h:mm TT",
        ampm: true,
        ...props,
        onSelect: (val) => {
          this.onChange(val);
        },
        onClose: (val) => {
          this.onChange(val);
        },
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  componentWillUnmout(){
    if (this.dom && $) {
      $(this.dom).timepicker( "destroy" );
    }
  }

  onChange(val){
    this.props.onChange && this.props.onChange(val);
  }

  render() {
    const { className, style } = this.props;
    return <input type="text" ref={(ref) => { this.dom = ref; }} style={style} className={classnames("form-control", className)} />;
  }
}

class DateTimePicker extends TimePicker {
  componentDidMount() {
    if (this.dom && $) {
      const props = this.props;
      const now = new moment();
      $(this.dom).datetimepicker({
        timeFormat: 'hh:mm TT',
        constrainInput: true,
        hideIfNoPrevNext: true,
        stepMinute: 15,
        stepHour: 1,
        hour: now.hour(),
        minute: now.minute(),
        ...props,
        onSelect: (val) => {
          this.onChange(val);
        },
        onClose: (val) => {
          this.onChange(val);
        },
      });
    }
  }
  
  componentWillUnmout(){
    if (this.dom && $) {
      $(this.dom).datetimepicker( "destroy" );
    }
  }
}


export { TimePicker, DateTimePicker };