import React from 'react';
import classnames from 'classnames';
import './index.less';
var Button = function (props) {
    var children = props.children, style = props.style, className = props.className, _a = props.icon, icon = _a === void 0 ? null : _a, _b = props.loading, loading = _b === void 0 ? false : _b, onClick = props.onClick;
    return React.createElement("button", { className: classnames("button", className, icon && "icon"), style: style, onClick: onClick },
        loading && React.createElement("i", { className: "loading" }),
        icon,
        React.createElement("span", null, children));
};
Button.Group = function (_a) {
    var children = _a.children, className = _a.className;
    return React.createElement("div", { className: classnames("buttonGroup", className) }, children);
};
export default Button;
//# sourceMappingURL=index.js.map