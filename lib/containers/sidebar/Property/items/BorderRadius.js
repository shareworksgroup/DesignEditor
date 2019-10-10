import React from 'react';
import { Number } from '../../../../components';
var BorderRadius = function (_a) {
    var _b = _a.borderRadius, borderRadius = _b === void 0 ? 4 : _b, _c = _a.title, title = _c === void 0 ? "Rounded Border" : _c, _d = _a.onUpdate, onUpdate = _d === void 0 ? function () { } : _d;
    return (React.createElement("div", { className: "ds-widget ds-link-widget" },
        React.createElement("div", { className: "card-row" },
            React.createElement("div", { className: "ds-widget-label col-6" },
                React.createElement("label", { className: "ds-label-primary" },
                    React.createElement("span", null, title))),
            React.createElement("div", { className: "col-6 text-right" },
                React.createElement(Number, { max: 100, step: 1, value: borderRadius, onChange: function (val) { onUpdate('borderRadius', val); } })))));
};
export default BorderRadius;
//# sourceMappingURL=BorderRadius.js.map