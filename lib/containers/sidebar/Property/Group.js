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
import classnames from 'classnames';
import AnimateHeight from 'react-animate-height';
var Group = /** @class */ (function (_super) {
    __extends(Group, _super);
    function Group() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            height: 'auto',
            expand: true,
        };
        _this.toggle = function () {
            if (_this.state.expand) {
                _this.setState({ height: 0, expand: false });
            }
            else {
                _this.setState({ height: 'auto', expand: true });
            }
        };
        return _this;
    }
    Group.prototype.render = function () {
        var _a = this.props, title = _a.title, children = _a.children, className = _a.className;
        return React.createElement("div", { className: classnames("card", className) },
            React.createElement("div", { className: "card-header", onClick: this.toggle },
                React.createElement("div", { className: "card-row" },
                    React.createElement("div", { className: "col-10" },
                        React.createElement("span", null, title)),
                    React.createElement("div", { className: "col-2 header-expand-icon" },
                        React.createElement("i", { className: this.state.expand ? "icon icon-up" : "icon icon-down" })))),
            React.createElement(AnimateHeight, { className: "collapse show", height: this.state.height },
                React.createElement("div", { className: "card-body" }, children)));
    };
    return Group;
}(React.Component));
export default Group;
//# sourceMappingURL=Group.js.map