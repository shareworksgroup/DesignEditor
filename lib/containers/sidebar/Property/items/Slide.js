import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { Number } from '../../../../components';
var Slide = function (_a) {
    var _b = _a.title, title = _b === void 0 ? "Width" : _b, _c = _a.value, value = _c === void 0 ? 100 : _c, _d = _a.attribute, attribute = _d === void 0 ? 'width' : _d, _e = _a.onUpdate, onUpdate = _e === void 0 ? function () { } : _e;
    return (React.createElement("div", { className: "ds-widget ds-link-widget" },
        React.createElement("div", { className: "card-row" },
            React.createElement("div", { className: "ds-widget-label col-6" },
                React.createElement("label", { className: "ds-label-primary" },
                    React.createElement("span", null, title))),
            React.createElement("div", { className: "col-6" },
                React.createElement(Slider, { trackStyle: { backgroundColor: '#007BFF' }, handleStyle: { borderColor: '#4094EF' }, value: value, onChange: function (val) { onUpdate(attribute, val); } }),
                React.createElement(Number, { max: 100, min: 0, step: 1, value: value, onChange: function (val) { onUpdate(attribute, val); }, style: { marginTop: 5 } })))));
};
export default Slide;
//# sourceMappingURL=Slide.js.map