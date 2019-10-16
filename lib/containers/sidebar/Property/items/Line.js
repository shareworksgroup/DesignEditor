import React from 'react';
import { Line } from '../../../../components';
var LineItem = function (_a) {
    var _b = _a.title, title = _b === void 0 ? "Line" : _b, lineWidth = _a.lineWidth, lineStyle = _a.lineStyle, lineColor = _a.lineColor, _c = _a.onUpdate, onUpdate = _c === void 0 ? function () { } : _c;
    return (React.createElement("div", { className: "ds-widget ds-link-widget" },
        React.createElement("div", { className: "card-row" },
            React.createElement("div", { className: "ds-widget-label col-6" },
                React.createElement("label", { className: "ds-label-primary" },
                    React.createElement("span", null, title))),
            React.createElement("div", { className: "col-6" },
                React.createElement(Line, { lineWidth: lineWidth, lineStyle: lineStyle, lineColor: lineColor, onUpdate: function (key, val) { onUpdate(key, val); } })))));
};
export default LineItem;
//# sourceMappingURL=Line.js.map