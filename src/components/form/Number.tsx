import React from 'react';

enum Operate {
  Minus = 1,
  Plus = 2,
}

const _formatter = v => v;
const _parser = v => v;

class Number extends React.Component<INumberProps> {

  onChange = (e: React.ChangeEvent<HTMLInputElement>, type?: Operate) => {
    const { value, step = 1, min = 0, max = 100, onChange = () => {}, parser = _parser } = this.props;
    let val = e ? parseInt(parser(e.target.value), 10) : value;
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(val)) {
      onChange(0);
      return;
    }
    switch (type) {
      case Operate.Minus:
        val = (val - step) < min ? min : (val - step);
        break;
      case Operate.Plus:
        val = (val + step) > max ? max : (val + step);
        break;
    }
    onChange(val);
  }

  onMinus = () => {
    this.onChange(null, Operate.Minus);
  }

  onPlus = () => {
    this.onChange(null, Operate.Plus);
  }

  render() {
    const { value, className, style = {}, formatter = _formatter } = this.props;
    return <div className={className} style={style}>
      <div className="ds-counter-control">
        <a onClick={this.onMinus} className="ds-counter-control-btn">-</a>
        <input className="ds-counter-control-value" value={formatter(value)} onChange={this.onChange} />
        <a onClick={this.onPlus} className="ds-counter-control-btn">+</a>
      </div>
    </div>;
  }
}

interface INumberProps {
  value?: number;
  step?: number;
  max?: number;
  min?: number;
  className?: string;
  style?: IKeyValueMap;
  onChange?: (value: number) => void;
  formatter?: (value: number) => any;
  parser?: (value: string) => string;
}

export default Number;