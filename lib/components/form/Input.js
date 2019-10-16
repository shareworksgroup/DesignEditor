import React from 'react';
import classnames from 'classnames';
import './index.less';
export default (function (_a) {
    var addOn = _a.addOn, value = _a.value, className = _a.className, _b = _a.style, style = _b === void 0 ? {} : _b, _c = _a.onChange, onChange = _c === void 0 ? function () { } : _c;
    return (React.createElement("div", { style: style, className: classnames("input-group", className) },
        addOn && React.createElement("div", { className: "input-group-prepend" },
            React.createElement("span", { className: "input-group-text" }, addOn)),
        React.createElement("input", { type: "text", style: addOn ? {} : { borderRadius: '0.25rem' }, value: value, onChange: onChange, className: "form-control" })));
});
//# sourceMappingURL=Input.js.map