import React from 'react';
import { Number } from '../../../../components';
var NumberItem = function (_a) {
    var title = _a.title, value = _a.value, _b = _a.step, step = _b === void 0 ? 50 : _b, _c = _a.max, max = _c === void 0 ? 1000 : _c, _d = _a.min, min = _d === void 0 ? 0 : _d, attribute = _a.attribute, _e = _a.onUpdate, onUpdate = _e === void 0 ? function () { } : _e;
    return (React.createElement("div", { className: "ds-widget ds-link-widget" },
        React.createElement("div", { className: "card-row" },
            React.createElement("div", { className: "ds-widget-label col-6" },
                React.createElement("label", { className: "ds-label-primary" },
                    React.createElement("span", null, title))),
            React.createElement("div", { className: "col-6 text-right" },
                React.createElement(Number, { max: max, min: min, step: step, value: value, onChange: function (val) { onUpdate(attribute, val); } })))));
};
export default NumberItem;
//# sourceMappingURL=Number.js.map