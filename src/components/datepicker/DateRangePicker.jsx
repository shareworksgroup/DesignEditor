import React from 'react';
import classnames from 'classnames';
import moment from 'moment';

class DateRangePicker extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    if (this.dom && $) {
      const props = this.props;
      let docWidth = $(document).width();
      let left = $(this.dom).offset().left;
      let right = docWidth - left;
      $(this.dom).daterangepicker({
        opens: left < right ? 'right' : 'left',
        autoUpdateInput: true,
        autoApply: true,
        alwaysShowCalendars: true,
        showDropdowns: true,
        ...props,
      });
      $(this.dom).on('apply.daterangepicker', (ev, picker) => {
        this.onChange(picker.startDate, picker.endDate);
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  onChange(...rest){
    this.props.onChange && this.props.onChange(...rest);
  }

  render() {
    const { className, style } = this.props;
    return <input type="text" ref={(ref) => { this.dom = ref; }} style={style} className={classnames("form-control", className)} />;
  }
}



export { DateRangePicker };