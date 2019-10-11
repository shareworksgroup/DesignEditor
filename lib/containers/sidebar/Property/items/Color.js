import React from 'react';
import ColorPicker from 'rc-color-picker';
import { rgb2rgba, rgba2rgb } from '../../../../lib/util';
import 'rc-color-picker/assets/index.css';
var Color = function (_a) {
    var _b = _a.title, title = _b === void 0 ? 'Color' : _b, _c = _a.value, value = _c === void 0 ? '#fff' : _c, _d = _a.attribute, attribute = _d === void 0 ? 'color' : _d, _e = _a.onUpdate, onUpdate = _e === void 0 ? function () { } : _e;
    var rgba = rgba2rgb(value);
    return React.createElement("div", { className: "ds-widget ds-link-widget" },
        React.createElement("div", { className: "card-row" },
            React.createElement("div", { className: "ds-widget-label col-6" },
                React.createElement("label", { className: "ds-label-primary" },
                    React.createElement("span", null, title))),
            React.createElement("div", { className: "col-6 text-right" },
                React.createElement(ColorPicker, { color: rgba.rgb, alpha: rgba.alpha, onChange: function (e) { onUpdate(attribute, rgb2rgba(e.color, e.alpha)); } }))));
};
export default Color;
//# sourceMappingURL=Color.js.map