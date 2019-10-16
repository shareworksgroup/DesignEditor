var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import React from 'react';
import Switch from "react-switch";
import { Number } from '../../../../components';
var Operate = {
    LEFT: 1,
    RIGHT: 2,
    TOP: 3,
    BOTTOM: 4,
    ALL: 5
};
var Formatter = function (val) { return val; };
var Space = /** @class */ (function (_super) {
    __extends(Space, _super);
    function Space(props) {
        var _this = _super.call(this, props) || this;
        _this.onMore = function (checked) {
            checked ? _this.setState({
                more: checked,
                top: _this.state.all,
                right: _this.state.all,
                bottom: _this.state.all,
                left: _this.state.all,
            }) : _this.setState({
                more: checked,
                all: _this.state.top,
            });
            !checked && _this.onChange(Operate.ALL, _this.state.all);
        };
        _this.onChange = function (operate, val) {
            var _a = _this.props, _b = _a.attribute, attribute = _b === void 0 ? "padding" : _b, _c = _a.onUpdate, onUpdate = _c === void 0 ? function () { } : _c;
            var value = '';
            switch (operate) {
                case Operate.ALL:
                    value = val + "px";
                    _this.setState({ all: val, top: val, right: val, bottom: val, left: val });
                    break;
                case Operate.TOP:
                    value = val + "px " + _this.state.right + "px " + _this.state.bottom + "px " + _this.state.left + "px";
                    _this.setState({ top: val });
                    break;
                case Operate.RIGHT:
                    value = _this.state.top + "px " + val + "px " + _this.state.bottom + "px " + _this.state.left + "px";
                    _this.setState({ right: val });
                    break;
                case Operate.BOTTOM:
                    value = _this.state.top + "px " + _this.state.right + "px " + val + "px " + _this.state.left + "px";
                    _this.setState({ bottom: val });
                    break;
                case Operate.LEFT:
                    value = _this.state.top + "px " + _this.state.right + "px " + _this.state.bottom + "px " + val + "px";
                    _this.setState({ left: val });
                    break;
            }
            onUpdate(attribute, value);
        };
        _this.state = Space.computeState(props);
        return _this;
    }
    Space.computeState = function (props) {
        var value = props.value;
        var val = value.replace(/px/g, '');
        var values = val.split(' ').map(function (i) { return parseInt(i, 10); });
        var moreValue = values.length > 1;
        return {
            more: moreValue,
            value: value,
            top: moreValue ? values[0] : parseInt(val, 10),
            right: moreValue ? values[1] : parseInt(val, 10),
            bottom: moreValue ? values[2] : parseInt(val, 10),
            left: moreValue ? values[3] : parseInt(val, 10),
            all: moreValue ? values[0] : parseInt(val, 10),
        };
    };
    Space.getDerivedStateFromProps = function (nextProps, prevState) {
        return nextProps.value !== prevState.value ? Space.computeState(nextProps) : null;
    };
    Space.prototype.render = function () {
        var _this = this;
        var _a = this.props.title, title = _a === void 0 ? 'Padding' : _a;
        return React.createElement("div", { className: "ds-widget ds-link-widget" },
            React.createElement("div", { className: "card-row" },
                React.createElement("div", { className: "ds-widget-label col-6" },
                    React.createElement("label", { className: "ds-label-primary" },
                        React.createElement("span", null, title))),
                React.createElement("div", { className: "col-6 text-right" },
                    React.createElement("div", { className: "ds-widget-label" },
                        React.createElement("label", null,
                            React.createElement("span", { style: { position: 'relative', cursor: 'pointer', top: '-3px', marginRight: '5px' }, onClick: function () { _this.onMore(!_this.state.more); } }, "More Options"),
                            React.createElement(Switch, { checked: this.state.more, onChange: this.onMore, height: 17, width: 34 }))))),
            this.state.more && React.createElement("div", { className: "row more-options", style: { marginTop: 10 } },
                React.createElement("div", { className: "col-6" },
                    React.createElement("div", { className: "ds-widget-label" },
                        React.createElement("label", null,
                            React.createElement("span", null, "Top"))),
                    React.createElement("div", { className: "ds-color-picker" },
                        React.createElement(Number, { max: 500, step: 1, formatter: Formatter, value: this.state.top, onChange: function (val) { _this.onChange(Operate.TOP, val); } }))),
                React.createElement("div", { className: "col-6" },
                    React.createElement("div", { className: "ds-widget-label" },
                        React.createElement("label", null,
                            React.createElement("span", null, "Right"))),
                    React.createElement("div", { className: "ds-color-picker" },
                        React.createElement(Number, { max: 500, step: 1, formatter: Formatter, value: this.state.right, onChange: function (val) { _this.onChange(Operate.RIGHT, val); } }))),
                React.createElement("div", { className: "col-6" },
                    React.createElement("div", { className: "ds-widget-label" },
                        React.createElement("label", null,
                            React.createElement("span", null, "Left"))),
                    React.createElement("div", { className: "ds-color-picker" },
                        React.createElement(Number, { max: 500, step: 1, formatter: Formatter, value: this.state.left, onChange: function (val) { _this.onChange(Operate.LEFT, val); } }))),
                React.createElement("div", { className: "col-6" },
                    React.createElement("div", { className: "ds-widget-label" },
                        React.createElement("label", null,
                            React.createElement("span", null, "Bottom"))),
                    React.createElement("div", { className: "ds-color-picker" },
                        React.createElement(Number, { max: 500, step: 1, formatter: Formatter, value: this.state.bottom, onChange: function (val) { _this.onChange(Operate.BOTTOM, val); } })))),
            !this.state.more && React.createElement("div", { className: "card-row", style: { marginTop: 10 } },
                React.createElement("div", { className: "col-6" },
                    React.createElement("div", { className: "ds-widget-label" },
                        React.createElement("label", null,
                            React.createElement("span", null, "All Sides"))),
                    React.createElement("div", { className: "ds-color-picker" },
                        React.createElement(Number, { max: 500, step: 1, formatter: Formatter, value: this.state.all, onChange: function (val) { _this.onChange(Operate.ALL, val); } })))));
    };
    return Space;
}(React.Component));
export default Space;
//# sourceMappingURL=Space.js.map