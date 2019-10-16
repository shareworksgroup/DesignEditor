import React from 'react';
import { Fonts } from '../../../../lib/enum';
var Font = function (_a) {
    var title = _a.title, fontFamily = _a.fontFamily, _b = _a.onUpdate, onUpdate = _b === void 0 ? function () { } : _b;
    return (React.createElement("div", { className: "ds-widget ds-link-widget" },
        React.createElement("div", { className: "card-row" },
            React.createElement("div", { className: "ds-widget-label col-6" },
                React.createElement("label", { className: "ds-label-primary" },
                    React.createElement("span", null, title))),
            React.createElement("div", { className: "col-6" },
                React.createElement("select", { className: "form-control form-control-sm", value: fontFamily, onChange: function (e) { onUpdate('fontFamily', e.target.value); } }, Object.keys(Fonts).map(function (i) { return React.createElement("option", { key: i, value: Fonts[i] }, i); }))))));
};
export default Font;
//# sourceMappingURL=Font.js.map