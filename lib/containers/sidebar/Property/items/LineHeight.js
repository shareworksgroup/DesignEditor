import React from 'react';
import { Number } from '../../../../components';
var LineHeight = function (_a) {
    var _b = _a.lineHeight, lineHeight = _b === void 0 ? 120 : _b, _c = _a.title, title = _c === void 0 ? "Line Height" : _c, _d = _a.onUpdate, onUpdate = _d === void 0 ? function () { } : _d;
    return (React.createElement("div", { className: "ds-widget ds-link-widget" },
        React.createElement("div", { className: "card-row" },
            React.createElement("div", { className: "ds-widget-label col-6" },
                React.createElement("label", { className: "ds-label-primary" },
                    React.createElement("span", null, title))),
            React.createElement("div", { className: "col-6 text-right" },
                React.createElement(Number, { max: 1000, step: 10, formatter: function (val) { return val + "%"; }, parser: function (val) { return val.replace('%', ''); }, value: lineHeight, onChange: function (val) { onUpdate('lineHeight', val); } })))));
};
export default LineHeight;
//# sourceMappingURL=LineHeight.js.map