import React from 'react';
import Switch from "react-switch";
var SwitchItem = function (_a) {
    var _b = _a.title, title = _b === void 0 ? 'Do Not Stack on Mobile' : _b, _c = _a.checked, checked = _c === void 0 ? false : _c, _d = _a.attribute, attribute = _d === void 0 ? 'noStackMobile' : _d, _e = _a.onUpdate, onUpdate = _e === void 0 ? function () { } : _e;
    return (React.createElement("div", { className: "ds-widget ds-link-widget" },
        React.createElement("div", { className: "card-row" },
            React.createElement("div", { className: "ds-widget-label col-12" },
                React.createElement("label", { className: "ds-label-primary" },
                    React.createElement("span", { style: { marginRight: 10 } }, title),
                    React.createElement("div", { style: { verticalAlign: 'middle', display: 'inline-block' } },
                        React.createElement(Switch, { checked: checked, onChange: function (checked) { onUpdate(attribute, checked); }, height: 17, width: 34 })))))));
};
export default SwitchItem;
//# sourceMappingURL=Switch.js.map