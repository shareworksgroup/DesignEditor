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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import React from 'react';
import { inject, observer } from 'mobx-react';
import ContentFactory from './sidebar/ContentItems/ContentFactory';
import Group from './sidebar/Property/Group';
var Content = /** @class */ (function (_super) {
    __extends(Content, _super);
    function Content() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Content.prototype.render = function () {
        var rootStore = this.props.rootStore;
        var extensionGroups = rootStore.DesignState.getExtensionGroups();
        return extensionGroups.map(function (group) { return React.createElement(Group, { key: group, title: group, className: "content-card" },
            React.createElement("ul", { className: "ds_content" }, rootStore.DesignState.extensions.filter(function (extension) { return extension.group === group; }).map(function (Extension) {
                var instance = new Extension();
                return ContentFactory(instance.getContentType(), instance.getLabel(), instance.getIconClass());
            })
                .map(function (Component, index) { return React.createElement(Component, { key: group + "_" + index }); }))); });
    };
    Content = __decorate([
        inject('rootStore'),
        observer
    ], Content);
    return Content;
}(React.Component));
export default Content;
//# sourceMappingURL=Content.js.map