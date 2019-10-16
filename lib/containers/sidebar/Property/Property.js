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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import React from 'react';
import Animate from 'rc-animate';
import { inject, observer } from 'mobx-react';
import classnames from 'classnames';
import { DesignType } from '../../../lib/enum';
import { LazyRenderBox } from '../../../components';
import RowProperty from './RowProperty';
var Property = /** @class */ (function (_super) {
    __extends(Property, _super);
    function Property() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onClose = function () {
            var DesignState = _this.props.rootStore.DesignState;
            DesignState.setSelected(null);
        };
        _this.onUpdate = function (key, value) {
            var _a = _this.props, propertyId = _a.propertyId, DesignState = _a.rootStore.DesignState;
            DesignState.updateAttribute(propertyId, key, value);
        };
        _this.onDelete = function (guid, type) {
            var DesignState = _this.props.rootStore.DesignState;
            if (type === DesignType.CONTENT) {
                DesignState.execCommand('deleteContent', guid);
            }
            else {
                DesignState.execCommand('deleteRow', guid);
            }
        };
        _this.onCopy = function (guid, type) {
            var DesignState = _this.props.rootStore.DesignState;
            if (type === DesignType.CONTENT) {
                DesignState.execCommand('copyContent', guid);
            }
            else {
                DesignState.execCommand('copyRow', guid);
            }
        };
        return _this;
    }
    Property.prototype.render = function () {
        var _this = this;
        var _a = this.props, propertyId = _a.propertyId, DesignState = _a.rootStore.DesignState;
        var data = DesignState.getDataByGuid(propertyId);
        if (!data) {
            return null;
        }
        var meta = data.values._meta;
        var title = 'Row';
        var extension = null;
        if (meta.type === DesignType.CONTENT) {
            title = "Content / " + meta.subtype;
            extension = DesignState.getExtension(meta.subtype);
        }
        /* eslint-disable */
        return React.createElement("div", { className: "ds-options-panel" },
            React.createElement("div", { className: "ds-options-header card" },
                React.createElement("div", { className: "card-row" },
                    React.createElement("div", { className: "col-7 ds-options-title" },
                        React.createElement("span", null, title)),
                    React.createElement("div", { className: "col-5 text-right" },
                        React.createElement("div", { className: "options-item", onClick: function () { _this.onDelete(propertyId, meta.type); }, "data-tooltipped": "", "aria-describedby": "tippy-tooltip-149", "data-original-title": "Delete" },
                            React.createElement("a", { className: "icon-delete icon" },
                                React.createElement("i", { className: "icon icon-trash" }))),
                        React.createElement("div", { className: "options-item", onClick: function () { _this.onCopy(propertyId, meta.type); }, "data-tooltipped": "", "aria-describedby": "tippy-tooltip-150", "data-original-title": "Duplicate" },
                            React.createElement("a", { className: "icon-duplicate icon" },
                                React.createElement("i", { className: "icon icon-copy" }))),
                        React.createElement("a", { onClick: this.onClose, className: "icon-close icon" },
                            React.createElement("i", { className: "icon icon-down" }))))),
            React.createElement("div", { className: "ds-options-content" }, extension ? new extension().getProperties(data.values, this.onUpdate) : React.createElement(RowProperty, __assign({}, data.values, { onUpdate: this.onUpdate }))));
        /* eslint-enable */
    };
    Property = __decorate([
        inject('rootStore'),
        observer
    ], Property);
    return Property;
}(React.Component));
var PropertyWrap = /** @class */ (function (_super) {
    __extends(PropertyWrap, _super);
    function PropertyWrap() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PropertyWrap.prototype.render = function () {
        var _a = this.props, className = _a.className, _b = _a.visible, visible = _b === void 0 ? false : _b, _c = _a.destroyOnClose, destroyOnClose = _c === void 0 ? false : _c, _d = _a.style, style = _d === void 0 ? {} : _d;
        var boxElement = React.createElement(LazyRenderBox, { key: "property", className: classnames('property-panel', className), hiddenClassName: 'hide', visible: visible, style: style },
            React.createElement(Property, __assign({}, this.props)));
        return React.createElement(Animate, { key: "property", showProp: "visible", transitionAppear: true, component: "", transitionName: "bottom" }, (!!visible || !destroyOnClose) ? boxElement : null);
    };
    PropertyWrap = __decorate([
        inject('rootStore'),
        observer
    ], PropertyWrap);
    return PropertyWrap;
}(React.Component));
export default PropertyWrap;
//# sourceMappingURL=Property.js.map