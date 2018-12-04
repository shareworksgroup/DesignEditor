import React from 'react';
import SourceRating from 'react-rating';

class Rating extends React.Component {

  constructor(props) {
    super(props);
    const { message = MESSAGE, value = 0 } = props;
    this.state = {
      message: value === 0 ? message: Mapping[value],
      value,
    };
  }

  onHover = (v) => {
    if (v) {
      this.setState({ message: Mapping[v] });
    } else {
      this.setState({ message: Mapping[this.state.value] || MESSAGE });
    }
  }

  onChange = (v) => {
    const { onChange } = this.props;
    this.setState({ message: Mapping[v], value: v });
    onChange && onChange(v);
  }

  render() {
    return <div>
      <SourceRating
        initialRating={this.state.value}
        className="rating"
        emptySymbol={<img src="/Sources/images/star-off.png" className="icon" />}
        fullSymbol={<img src="/Sources/images/star-on.png" className="icon" />}
        placeholderSymbol={<img src="/Sources/images/star-on.png" className="icon" />}
        onHover={this.onHover}
        onChange={this.onChange}
      />
      <div class="text-danger mt10" style={{fontSize: '13px'}}>{this.state.message}</div>
    </div>;
  }
}

const MESSAGE = 'Please give your rating.';
const Mapping = {
  1: 'Very Poor',
  2: 'Below Average',
  3: 'Average',
  4: 'Above Average',
  5: 'Excellent'
};

export default Rating;