import React from 'react';
import ColorPicker from 'rc-color-picker';
import 'rc-color-picker/assets/index.css';
import { rgb2rgba, rgba2rgb } from '../../../../lib/util';
var Colors = function (_a) {
    var _b = _a.title, title = _b === void 0 ? 'Colors' : _b, _c = _a.colors, color = _c.color, backgroundColor = _c.backgroundColor, hoverColor = _c.hoverColor, hoverBackgroundColor = _c.hoverBackgroundColor, _d = _a.onUpdate, onUpdate = _d === void 0 ? function () { } : _d;
    var colorRgba = rgba2rgb(color);
    var backgroundColorRgba = rgba2rgb(backgroundColor);
    var hoverColorRgba = rgba2rgb(hoverColor);
    var hoverBackgroundColorRgba = rgba2rgb(hoverBackgroundColor);
    return React.createElement("div", { className: "ds-widget ds-link-widget" },
        React.createElement("div", { className: "card-row" },
            React.createElement("div", { className: "ds-widget-label col-6" },
                React.createElement("label", { className: "ds-label-primary" },
                    React.createElement("span", null, title)))),
        React.createElement("div", { className: "card-row", style: { marginTop: 10 } },
            color && React.createElement("div", { className: "col-6" },
                React.createElement("div", { className: "ds-widget-label" },
                    React.createElement("label", null,
                        React.createElement("span", null, "Text Color"))),
                React.createElement("div", { className: "ds-color-picker" },
                    React.createElement(ColorPicker, { color: colorRgba.rgb, alpha: colorRgba.alpha, onChange: function (e) { onUpdate('color', rgb2rgba(e.color, e.alpha)); } }))),
            backgroundColor && React.createElement("div", { className: "col-6" },
                React.createElement("div", { className: "ds-widget-label" },
                    React.createElement("label", null,
                        React.createElement("span", null, "Background Color"))),
                React.createElement("div", { className: "ds-color-picker" },
                    React.createElement(ColorPicker, { color: backgroundColorRgba.rgb, alpha: backgroundColorRgba.alpha, onChange: function (e) { onUpdate('backgroundColor', rgb2rgba(e.color, e.alpha)); } }))),
            hoverColor && React.createElement("div", { className: "col-6" },
                React.createElement("div", { className: "ds-widget-label" },
                    React.createElement("label", null,
                        React.createElement("span", null, "Hover Color"))),
                React.createElement("div", { className: "ds-color-picker" },
                    React.createElement(ColorPicker, { color: hoverColorRgba.rgb, alpha: hoverColorRgba.alpha, onChange: function (e) { onUpdate('hoverColor', rgb2rgba(e.color, e.alpha)); } }))),
            hoverBackgroundColor && React.createElement("div", { className: "col-6" },
                React.createElement("div", { className: "ds-widget-label" },
                    React.createElement("label", null,
                        React.createElement("span", null, "Hover Background Color"))),
                React.createElement("div", { className: "ds-color-picker" },
                    React.createElement(ColorPicker, { color: hoverBackgroundColorRgba.rgb, alpha: hoverBackgroundColorRgba.alpha, onChange: function (e) { onUpdate('hoverBackgroundColor', rgb2rgba(e.color, e.alpha)); } })))));
};
export default Colors;
//# sourceMappingURL=Colors.js.map