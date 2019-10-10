import React from 'react';
import { Input } from '../../../../components';
var Link = function (_a) {
    var title = _a.title, linkType = _a.linkType, link = _a.link, _b = _a.onUpdate, onUpdate = _b === void 0 ? function () { } : _b;
    return (React.createElement("div", { className: "ds-widget ds-link-widget" },
        React.createElement("div", { className: "card-row" },
            React.createElement("div", { className: "ds-widget-label col-6" },
                React.createElement("label", { className: "ds-label-primary" },
                    React.createElement("span", null, title))),
            React.createElement("div", { className: "col-6" },
                React.createElement("select", { className: "form-control form-control-sm", value: linkType, onChange: function (e) { onUpdate('linkType', e.target.value); } },
                    React.createElement("option", { value: "_self" }, "Same Tab"),
                    React.createElement("option", { value: "_blank" }, "New Tab")))),
        React.createElement("div", { className: "card-row", style: { marginTop: 10 } },
            React.createElement("div", { className: "col-12" },
                React.createElement(Input, { addOn: "URL", onChange: function (e) { onUpdate('link', e.target.value); }, value: link })))));
};
export default Link;
//# sourceMappingURL=Link.js.map