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
import { inject, observer } from 'mobx-react';
import Content from './Content';
import Row from './Row';
import { Tabs } from '../components';
import Property from './sidebar/Property/Property';
import BodyProperty from './sidebar/Property/BodyProperty';
var SideBar = /** @class */ (function (_super) {
    __extends(SideBar, _super);
    function SideBar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            active: 0
        };
        _this.onUpdate = function (key, value) {
            var DesignState = _this.props.rootStore.DesignState;
            DesignState.updateBodyAttribute(key, value);
        };
        _this.onTabClick = function () {
            var DesignState = _this.props.rootStore.DesignState;
            DesignState.setSelected(null);
        };
        return _this;
    }
    SideBar.prototype.render = function () {
        var DesignState = this.props.rootStore.DesignState;
        var body = DesignState.data.body.values;
        return React.createElement("div", { className: "ds_sidebar" },
            React.createElement(Tabs, { onClick: this.onTabClick },
                React.createElement(Tabs.Tab, { tab: "Content", icon: "icon icon-text" },
                    React.createElement(Content, null)),
                React.createElement(Tabs.Tab, { tab: "Row", icon: "icon icon-drag-handler" },
                    React.createElement(Row, null)),
                React.createElement(Tabs.Tab, { tab: "Body", icon: "icon icon-body" },
                    React.createElement("div", { className: "property-panel body-property-panel" },
                        React.createElement(BodyProperty, __assign({}, body, { onUpdate: this.onUpdate }))))),
            React.createElement(Property, { visible: !!DesignState.selected, propertyId: DesignState.selected, destroyOnClose: true }));
    };
    SideBar = __decorate([
        inject('rootStore'),
        observer
    ], SideBar);
    return SideBar;
}(React.Component));
export default SideBar;
//# sourceMappingURL=SideBar.js.map