var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as React from 'react';
import Editor from './html/react-simple-code-editor';
import { highlight, languages } from './html/prism';
import './html/prism.css';
export default (function (_a) {
    var value = _a.value, onChange = _a.onChange, _b = _a.style, style = _b === void 0 ? {} : _b;
    return (React.createElement("div", { style: __assign({}, style, { minHeight: 50 }) },
        React.createElement(Editor, { value: value, onValueChange: function (value) { return onChange(value); }, highlight: function (code) { var a = highlight(code, languages.html); console.log(code, a); return a; }, padding: 10, style: {
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
            } })));
});
//# sourceMappingURL=Html.js.map