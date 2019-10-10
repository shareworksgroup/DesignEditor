import React from 'react';
import { Align } from '../../../../components';
var AlignItem = function (_a) {
    var _b = _a.align, align = _b === void 0 ? 'center' : _b, _c = _a.title, title = _c === void 0 ? "Alignments" : _c, _d = _a.onUpdate, onUpdate = _d === void 0 ? function () { } : _d;
    return (React.createElement("div", { className: "ds-widget ds-link-widget" },
        React.createElement("div", { className: "card-row" },
            React.createElement("div", { className: "ds-widget-label col-6" },
                React.createElement("label", { className: "ds-label-primary" },
                    React.createElement("span", null, title))),
            React.createElement("div", { className: "col-6" },
                React.createElement(Align, { align: align, onChange: function (align) { onUpdate('textAlign', align); } })))));
};
export default AlignItem;
//# sourceMappingURL=Align.js.map