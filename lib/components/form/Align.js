var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import React from 'react';
import classnames from 'classnames';
import './index.less';
var Align = /** @class */ (function (_super) {
    __extends(Align, _super);
    function Align() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Align.prototype.render = function () {
        var _a = this.props, align = _a.align, onChange = _a.onChange;
        return React.createElement("div", { className: "align-item" },
            React.createElement("a", { className: classnames({ active: align === 'left' }), onClick: function () { onChange('left'); } },
                React.createElement("i", { className: "icon icon-align-to-left" })),
            React.createElement("a", { className: classnames({ active: align === 'center' }), onClick: function () { onChange('center'); } },
                React.createElement("i", { className: "icon icon-center-text-alignment" })),
            React.createElement("a", { className: classnames({ active: align === 'right' }), onClick: function () { onChange('right'); } },
                React.createElement("i", { className: "icon icon-align-to-right" })));
    };
    return Align;
}(React.Component));
export default Align;
//# sourceMappingURL=Align.js.map