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
import Util from '../utils/util';
import './index.less';
var fn = function () { };
var AutoCompletePanel = /** @class */ (function (_super) {
    __extends(AutoCompletePanel, _super);
    function AutoCompletePanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            index: 0
        };
        _this.pressKey = function (e) {
            var _a = _this.props, show = _a.show, _b = _a.data, data = _b === void 0 ? [] : _b, _c = _a.onClick, onClick = _c === void 0 ? fn : _c, _d = _a.onClose, onClose = _d === void 0 ? fn : _d;
            if (!show) {
                return;
            }
            // 38 up 40 down
            switch (e.which) {
                case 38:
                    _this.setState({ index: _this.state.index > 0 ? _this.state.index - 1 : data.length - 1 });
                    e.preventDefault();
                    break;
                case 40:
                    _this.setState({ index: _this.state.index < (data.length - 1) ? _this.state.index + 1 : 0 });
                    e.preventDefault();
                    break;
                case 13:
                    onClick(data[_this.state.index]);
                    onClose();
                    _this.setState({ index: 0 });
                    e.preventDefault();
                    break;
                case 27:
                    onClose();
                    _this.setState({ index: 0 });
                    e.preventDefault();
                    break;
            }
        };
        _this.onBodyClick = function (e) {
            var _a = _this.props.onClose, onClose = _a === void 0 ? fn : _a;
            if (!Util.isParent(e.target, _this.dom)) {
                try {
                    onClose();
                }
                catch (e) {
                    console.log(e);
                }
            }
        };
        _this.onItemClick = function (item) {
            var _a = _this.props.onClick, onClick = _a === void 0 ? fn : _a;
            onClick(item);
        };
        _this.onRef = function (dom) {
            _this.dom = dom;
        };
        return _this;
    }
    AutoCompletePanel.prototype.componentDidMount = function () {
        document.body.addEventListener('click', this.onBodyClick, true);
        document.body.addEventListener('keydown', this.pressKey);
    };
    AutoCompletePanel.prototype.componentWillUnmount = function () {
        document.body.removeEventListener('click', this.onBodyClick);
        document.body.removeEventListener('keydown', this.pressKey);
    };
    AutoCompletePanel.prototype.render = function () {
        var _this = this;
        var _a = this.props, _b = _a.data, data = _b === void 0 ? [] : _b, _c = _a.show, show = _c === void 0 ? false : _c, _d = _a.position, position = _d === void 0 ? { x: 0, y: 0 } : _d;
        return show && data.length > 0 && React.createElement("div", { className: "dynamic", style: { left: position.x + 20, top: position.y + 20 }, ref: this.onRef },
            React.createElement("ul", { onMouseLeave: function () { _this.setState({ index: -1 }); } }, data.map(function (i, index) { return (React.createElement("li", { onMouseEnter: function (e) { _this.setState({ index: index }); }, className: index === _this.state.index ? "active" : "", key: i.key, onClick: function (e) { _this.onItemClick(i); }, title: i.title }, i.key)); })));
    };
    return AutoCompletePanel;
}(React.Component));
export default AutoCompletePanel;
//# sourceMappingURL=AutoCompletePanel.js.map