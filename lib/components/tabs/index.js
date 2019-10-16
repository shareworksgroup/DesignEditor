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
var Tabs = /** @class */ (function (_super) {
    __extends(Tabs, _super);
    function Tabs() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            selectedIndex: 0
        };
        return _this;
    }
    Tabs.prototype.render = function () {
        var _this = this;
        var _a = this.props, children = _a.children, onClick = _a.onClick;
        return React.createElement(React.Fragment, null,
            React.createElement("ul", { className: "nav nav-tabs", onClick: onClick }, React.Children.map(children, function (value, index) {
                return React.createElement("li", { className: "nav-item" },
                    React.createElement("a", { onClick: function () { _this.setState({ selectedIndex: index }); }, className: classnames("nav-link", _this.state.selectedIndex === index && "active") },
                        React.createElement("i", { className: value.props.icon + " icon" }),
                        value.props.tab));
            })),
            React.createElement("div", { onClick: onClick }, React.Children.toArray(children)[this.state.selectedIndex]));
    };
    return Tabs;
}(React.Component));
var Tab = /** @class */ (function (_super) {
    __extends(Tab, _super);
    function Tab() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Tab.prototype.render = function () {
        var children = this.props.children;
        return React.createElement("div", null, children);
    };
    return Tab;
}(React.Component));
Tabs.Tab = Tab;
export default Tabs;
//# sourceMappingURL=index.js.map