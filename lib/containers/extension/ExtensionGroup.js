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
import rootStore from '../../store/store';
var ExtensionGroup = /** @class */ (function (_super) {
    __extends(ExtensionGroup, _super);
    function ExtensionGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExtensionGroup.prototype.componentDidMount = function () {
        this.initConfig();
    };
    ExtensionGroup.prototype.initConfig = function () {
        var _a = this.props, children = _a.children, title = _a.title;
        setTimeout(function () {
            React.Children.forEach(children, function (child) {
                if (child) {
                    var content = new child.type({}); // eslint-disable-line
                    child.type.type = content.getContentType();
                    child.type.group = title;
                    rootStore.DesignState.addExtension(child.type);
                    rootStore.DesignState.setAttribute(child.type.type, content.getInitialAttribute());
                }
            });
        });
    };
    ExtensionGroup.prototype.render = function () {
        return null;
    };
    return ExtensionGroup;
}(React.Component));
export default ExtensionGroup;
//# sourceMappingURL=ExtensionGroup.js.map