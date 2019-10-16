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
var Selector = /** @class */ (function (_super) {
    __extends(Selector, _super);
    function Selector() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Selector.prototype.componentDidMount = function () {
        var _a = this.props.onRef, onRef = _a === void 0 ? function () { } : _a;
        if (this.dragDom) {
            onRef(this.dragDom);
        }
    };
    Selector.prototype.render = function () {
        var _this = this;
        var _a = this.props, _b = _a.placeholder, placeholder = _b === void 0 ? "Row" : _b, _c = _a.type, type = _c === void 0 ? "row" : _c, _d = _a.onDelete, onDelete = _d === void 0 ? function () { } : _d, _e = _a.onCopy, onCopy = _e === void 0 ? function () { } : _e;
        return React.createElement("div", { className: "ds-layer-selector" },
            React.createElement("div", { className: "ds-layer-type" }, placeholder),
            React.createElement("div", { ref: function (dom) { _this.dragDom = dom; }, className: classnames("ds-layer-drag", type === 'row' ? 'ds-layer-drag-rows' : 'ds-layer-drag-contents') },
                React.createElement("i", { className: "icon icon-move" })),
            React.createElement("div", { className: "ds-layer-controls ds-layer-controls-rows" },
                React.createElement("div", { style: { display: 'inline' } },
                    React.createElement("a", { className: "ds-layer-control ds-delete", onClick: onDelete },
                        React.createElement("i", { className: "icon icon-trash" }))),
                React.createElement("div", { style: { display: 'inline' } },
                    React.createElement("a", { className: "ds-layer-control", onClick: onCopy },
                        React.createElement("i", { className: "icon icon-copy" })))));
    };
    return Selector;
}(React.Component));
export default Selector;
//# sourceMappingURL=Selector.js.map