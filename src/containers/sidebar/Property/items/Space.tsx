import React from 'react';
import Switch from "react-switch";
import { Number } from '../../../../components';

const Operate = {
  LEFT: 1,
  RIGHT: 2,
  TOP: 3,
  BOTTOM: 4,
  ALL: 5
}

const Formatter = val => val;

class Space extends React.Component<ISpaceProps, ISpaceState> {

  constructor(props) {
    super(props);
    this.state = Space.computeState(props);
  }

  static computeState(props: ISpaceProps) {
    const { value } = props;
    let val = value.replace(/px/g, '')
    const values = val.split(' ').map(i => parseInt(i, 10));
    const moreValue = values.length > 1;
    return {
      more: moreValue,
      value: value,
      top: moreValue ? values[0] : parseInt(val, 10),
      right: moreValue ? values[1] : parseInt(val, 10),
      bottom: moreValue ? values[2] : parseInt(val, 10),
      left: moreValue ? values[3] : parseInt(val, 10),
      all: moreValue ? values[0] : parseInt(val, 10),
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return nextProps.value !== prevState.value ? Space.computeState(nextProps) : null;
  }

  onMore = (checked) => {
    checked ? this.setState({
      more: checked,
      top: this.state.all,
      right: this.state.all,
      bottom: this.state.all,
      left: this.state.all,
    }) : this.setState({
      more: checked,
      all: this.state.top,
    });
    !checked && this.onChange(Operate.ALL, this.state.all);
  }

  onChange = (operate, val) => {
    const { attribute = "padding", onUpdate = () => { } } = this.props;
    let value = '';
    switch (operate) {
      case Operate.ALL:
        value = `${val}px`;
        this.setState({ all: val, top: val, right: val, bottom: val, left: val });
        break;
      case Operate.TOP:
        value = `${val}px ${this.state.right}px ${this.state.bottom}px ${this.state.left}px`;
        this.setState({ top: val });
        break;
      case Operate.RIGHT:
        value = `${this.state.top}px ${val}px ${this.state.bottom}px ${this.state.left}px`;
        this.setState({ right: val });
        break;
      case Operate.BOTTOM:
        value = `${this.state.top}px ${this.state.right}px ${val}px ${this.state.left}px`;
        this.setState({ bottom: val });
        break;
      case Operate.LEFT:
        value = `${this.state.top}px ${this.state.right}px ${this.state.bottom}px ${val}px`;
        this.setState({ left: val });
        break;
    }

    onUpdate(attribute, value);
  }

  render() {
    const { title = 'Padding' } = this.props;
    return <div className="ds-widget ds-link-widget">
      <div className="row">
        <div className="ds-widget-label col-6">
          <label className="ds-label-primary"><span>{title}</span></label>
        </div>
        <div className="col-6 text-right">
          <div className="ds-widget-label">
            <label>
              <span style={{ position: 'relative', cursor: 'pointer', top: '-3px', marginRight: '5px' }} onClick={() => { this.onMore(!this.state.more) }}>More Options</span>
              <Switch checked={this.state.more} onChange={this.onMore} height={17} width={34} />
            </label>
          </div>
        </div>
      </div>
      {this.state.more && <div className="row more-options" style={{ marginTop: 10 }}>
        <div className="col-6">
          <div className="ds-widget-label"><label><span>Top</span></label></div>
          <div className="ds-color-picker"><Number max={500} step={1} formatter={Formatter} value={this.state.top} onChange={(val) => { this.onChange(Operate.TOP, val) }} /></div>
        </div>
        <div className="col-6">
          <div className="ds-widget-label"><label><span>Right</span></label></div>
          <div className="ds-color-picker"><Number max={500} step={1} formatter={Formatter} value={this.state.right} onChange={(val) => { this.onChange(Operate.RIGHT, val) }} /></div>
        </div>
        <div className="col-6">
          <div className="ds-widget-label"><label><span>Left</span></label></div>
          <div className="ds-color-picker"><Number max={500} step={1} formatter={Formatter} value={this.state.left} onChange={(val) => { this.onChange(Operate.LEFT, val) }} /></div>
        </div>
        <div className="col-6">
          <div className="ds-widget-label"><label><span>Bottom</span></label></div>
          <div className="ds-color-picker"><Number max={500} step={1} formatter={Formatter} value={this.state.bottom} onChange={(val) => { this.onChange(Operate.BOTTOM, val) }} /></div>
        </div>
      </div>}
      {!this.state.more && <div className="row" style={{ marginTop: 10 }}>
        <div className="col-6">
          <div className="ds-widget-label"><label><span>All Sides</span></label></div>
          <div className="ds-color-picker"><Number max={500} step={1} formatter={Formatter} value={this.state.all} onChange={(val) => { this.onChange(Operate.ALL, val) }} /></div>
        </div>
      </div>}
    </div>;
  }
}

interface ISpaceProps {
  title?: string;
  value?: string;
  attribute?: string;
  onUpdate?: onUpdate;
}

interface ISpaceState {
  more?: boolean;
  all?: number;
  left?: number;
  top?: number;
  right?: number;
  bottom?: number;
}

export default Space;