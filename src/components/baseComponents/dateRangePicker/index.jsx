import React from 'react'
import moment from 'moment';
import Picker from 'rc-calendar/lib/Picker'
import RangeCalendar from 'rc-calendar/lib/RangeCalendar'
import TimePickerPanel from 'rc-time-picker/lib/Panel'

const now = moment()

const defaultCalendarValue = now.clone();
defaultCalendarValue.add(-1, 'month');

const timePickerElement = (
  <TimePickerPanel
    defaultValue={[moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]}
  />
);

function newArray(start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

function disabledDate(current) {
  const date = moment();
  date.hour(0);
  date.minute(0);
  date.second(0);
  return current.isBefore(date);  // can not select days before today
}

function disabledTime(time, type) {
  // console.log('disabledTime', time, type);
  if (type === 'start') {
    return {
      disabledHours() {
        const hours = newArray(0, 60);
        hours.splice(20, 4);
        return hours;
      },
      disabledMinutes(h) {
        if (h === 20) {
          return newArray(0, 31);
        } else if (h === 23) {
          return newArray(30, 60);
        }
        return [];
      },
      disabledSeconds() {
        return [55, 56];
      },
    };
  }
  return {
    disabledHours() {
      const hours = newArray(0, 60);
      hours.splice(2, 6);
      return hours;
    },
    disabledMinutes(h) {
      if (h === 20) {
        return newArray(0, 31);
      } else if (h === 23) {
        return newArray(30, 60);
      }
      return [];
    },
    disabledSeconds() {
      return [55, 56];
    },
  };
}

const formatStr = 'YYYY-MM-DD';
function format(v) {
  return v ? v.format(formatStr) : '';
}

function isValidRange(v) {
  return v && v[0] && v[1];
}

function onStandaloneChange(value) {
  console.log('onChange');
  console.log(value[0] && format(value[0]), value[1] && format(value[1]));
}

function onStandaloneSelect(value) {
  console.log('onSelect');
  console.log(format(value[0]), format(value[1]));
}

class DateRangePicker extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    // value: [],
    hoverValue: [],
  }

  onChange = (value) => {
    console.log('onChange', value);
    // this.setState({ value });
    this.props.onChange(value)
  }

  onClear = (e) => {
    e.stopPropagation()
    this.onChange([])
  }

  onHoverChange = (hoverValue) => {
    this.setState({ hoverValue });
  }

  render() {
    const state = this.state
    const {currentRange, onClear, type} = this.props
    const calendar = (
      <RangeCalendar
        hoverValue={state.hoverValue}
        onHoverChange={this.onHoverChange}
        showWeekNumber={false}
        dateInputPlaceholder={['start', 'end']}
        defaultValue={[now, now.clone().add(1, 'months')]}
        disabledTime={disabledTime}
        timePicker={timePickerElement}
        showOk={false}
      />
    )

    const SelectComponent = <div className="search-group">
      <input name="TestReactiveWoNumber" type="text" className="form-control input-sm"
        value={isValidRange(currentRange) && `${format(currentRange[0])} - ${format(currentRange[1])}` || ''}
         placeholder={type} readOnly />
    </div>

    return (
      <Picker
        value={currentRange}
        onChange={this.onChange}
        animation="slide-up"
        calendar={calendar}
      >
        {
          ({ value }) => {
            return (SelectComponent)
          }
        }
      </Picker>
    )
  }
}

export default DateRangePicker