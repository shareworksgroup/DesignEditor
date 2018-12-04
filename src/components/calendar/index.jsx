import React from 'react';
import classnames from 'classnames';
import moment from 'moment';
import Moon from 'moon';

const config = {
  header: {
      right: 'today prev,next',
      left: 'title',
  },
  aspectRatio: 1.5,
  selectable: true,
  contentHeight: 700,
  titleFormat: 'MMMM YYYY',
  events: [],
  editable: true,
  eventRender: function(event, element) {
      element.find('.fc-time').prepend('<i class="fa fa-circle" style="color:' + event.color + '"></i>').append('&nbsp;-&nbsp;' + event.constraint);
  }
};

class FullCalendar extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.dom && $ && $.fn.fullCalendar) {
      const props = this.props;
      this.instance = $(this.dom).fullCalendar({ ...config, ...props });
      $('.fc-next-button', this.instance).click(this.props.nextClick);
      $('.fc-prev-button', this.instance).click(this.props.prevClick);
      $('.fc-today-button', this.instance).click(this.props.todayClick);
    } else {
      throw new Error('FullCalendar need jQuery and jquery.fullcalendar');
    }
  }

  componentWillReceiveProps(nextProps){
    if (this.events !== nextProps.events && Moon.type(this.events) === Moon.Enum.Types.Array) {
      this.instance.fullCalendar('removeEvents');
      this.instance.fullCalendar('renderEvents', nextProps.events, true);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  componentWillUnmount(){
    if (this.instance) {
      this.instance.fullCalendar('destroy');
    }
  }

  render() {
    return <div type="text" ref={(ref) => { this.dom = ref; }} />;
  }
}



export default FullCalendar;