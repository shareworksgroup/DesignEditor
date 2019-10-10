import React from 'react';
import { Input } from '../../../../components';
var InputItem = function (_a) {
    var title = _a.title, value = _a.value, attribute = _a.attribute, desc = _a.desc, _b = _a.onUpdate, onUpdate = _b === void 0 ? function () { } : _b;
    return (React.createElement("div", { className: "ds-widget ds-link-widget" },
        React.createElement("div", { className: "card-row" },
            React.createElement("div", { className: "ds-widget-label col-6" },
                React.createElement("label", { className: "ds-label-primary" },
                    React.createElement("span", null, title)))),
        React.createElement("div", { className: "card-row", style: { marginTop: 10 } },
            React.createElement("div", { className: "col-12" },
                React.createElement(Input, { onChange: function (e) { onUpdate(attribute, e.target.value); }, value: value }),
                desc && React.createElement("div", { className: "ds-widget-hint" }, desc)))));
};
export default InputItem;
//# sourceMappingURL=Input.js.map