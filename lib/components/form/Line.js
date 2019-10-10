import React from 'react';
import ColorPicker from 'rc-color-picker';
import 'rc-color-picker/assets/index.css';
import './index.less';
import Number from './Number';
import { rgb2rgba, rgba2rgb } from '../../lib/util';
export default (function (_a) {
    var lineWidth = _a.lineWidth, lineStyle = _a.lineStyle, lineColor = _a.lineColor, onUpdate = _a.onUpdate;
    var rgba = rgba2rgb(lineColor);
    return React.createElement(React.Fragment, null,
        React.createElement("select", { className: "form-control", value: lineStyle, onChange: function (e) { onUpdate('lineStyle', e.target.value); } },
            React.createElement("option", { value: "solid" }, "Solid"),
            React.createElement("option", { value: "dotted" }, "Dotted"),
            React.createElement("option", { value: "dashed" }, "Dashed")),
        React.createElement("div", { style: { marginTop: 5 } },
            React.createElement("div", { style: { display: 'inline-block', verticalAlign: 'top' } },
                React.createElement(Number, { max: 20, min: 1, step: 1, value: lineWidth, onChange: function (val) { onUpdate('lineWidth', val); } })),
            React.createElement("div", { style: { display: 'inline-block', marginLeft: 30 } },
                React.createElement(ColorPicker, { color: rgba.rgb, alpha: rgba.alpha, onChange: function (e) { onUpdate('lineColor', rgb2rgba(e.color, e.alpha)); } }))));
});
//# sourceMappingURL=Line.js.map