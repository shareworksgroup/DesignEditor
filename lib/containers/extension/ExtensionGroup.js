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
var ExtensionGroup = /** @class */ (function (_super) {
    __extends(ExtensionGroup, _super);
    function ExtensionGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExtensionGroup.prototype.componentDidMount = function () {
        this.initConfig();
    };
    ExtensionGroup.prototype.initConfig = function () {
        var _a = this.props, rootStore = _a.rootStore, children = _a.children, title = _a.title;
        React.Children.forEach(children, function (child) {
            if (child) {
                var content = new child.type({}); // eslint-disable-line
                child.type.type = content.getContentType();
                child.type.group = title;
                rootStore.DesignState.addExtension(child.type);
                rootStore.DesignState.setAttribute(child.type.type, content.getInitialAttribute());
            }
        });
    };
    ExtensionGroup.prototype.render = function () {
        return null;
    };
    ExtensionGroup = __decorate([
        inject('rootStore'),
        observer
    ], ExtensionGroup);
    return ExtensionGroup;
}(React.Component));
export default ExtensionGroup;
//# sourceMappingURL=ExtensionGroup.js.map