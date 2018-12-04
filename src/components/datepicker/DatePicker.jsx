import React from 'react';
import classnames from 'classnames';
import moment from 'moment';

class DatePicker extends React.Component {
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
      $(this.dom).bootstrapdatepicker({
        autoclose: true,
        ...props,
      }).on('changeDate', function(e) {
          console.log(e);
      });;
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  componentWillUnmout(){
    if (this.dom && $) {
      $(this.dom).bootstrapdatepicker('remove');
    }
  }

  onChange(...rest){
    this.props.onChange && this.props.onChange(...rest);
  }

  render() {
    const { className, style } = this.props;
    return <input type="text" ref={(ref) => { this.dom = ref; }} style={style} className={classnames("form-control", className)} />;
  }
}



export { DatePicker };