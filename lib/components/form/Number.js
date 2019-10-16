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
var Operate;
(function (Operate) {
    Operate[Operate["Minus"] = 1] = "Minus";
    Operate[Operate["Plus"] = 2] = "Plus";
})(Operate || (Operate = {}));
var _formatter = function (v) { return v; };
var _parser = function (v) { return v; };
var Number = /** @class */ (function (_super) {
    __extends(Number, _super);
    function Number() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onChange = function (e, type) {
            var _a = _this.props, value = _a.value, _b = _a.step, step = _b === void 0 ? 1 : _b, _c = _a.min, min = _c === void 0 ? 0 : _c, _d = _a.max, max = _d === void 0 ? 100 : _d, _e = _a.onChange, onChange = _e === void 0 ? function () { } : _e, _f = _a.parser, parser = _f === void 0 ? _parser : _f;
            var val = e ? parseInt(parser(e.target.value), 10) : value;
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
        };
        _this.onMinus = function () {
            _this.onChange(null, Operate.Minus);
        };
        _this.onPlus = function () {
            _this.onChange(null, Operate.Plus);
        };
        return _this;
    }
    Number.prototype.render = function () {
        var _a = this.props, value = _a.value, className = _a.className, _b = _a.style, style = _b === void 0 ? {} : _b, _c = _a.formatter, formatter = _c === void 0 ? _formatter : _c;
        return React.createElement("div", { className: className, style: style },
            React.createElement("div", { className: "ds-counter-control" },
                React.createElement("a", { onClick: this.onMinus, className: "ds-counter-control-btn" }, "-"),
                React.createElement("input", { className: "ds-counter-control-value", value: formatter(value), onChange: this.onChange }),
                React.createElement("a", { onClick: this.onPlus, className: "ds-counter-control-btn" }, "+")));
    };
    return Number;
}(React.Component));
export default Number;
//# sourceMappingURL=Number.js.map