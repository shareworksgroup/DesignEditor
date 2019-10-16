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
import * as React from 'react';
import { createPortal } from 'react-dom';
var Portal = /** @class */ (function (_super) {
    __extends(Portal, _super);
    function Portal() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getContainer = function () {
            var container = document.createElement('div');
            document.body.appendChild(container);
            return container;
        };
        return _this;
    }
    Portal.prototype.componentDidMount = function () {
        this.createContainer();
    };
    Portal.prototype.componentDidUpdate = function (prevProps) {
        var didUpdate = this.props.didUpdate;
        if (didUpdate) {
            didUpdate(prevProps);
        }
    };
    Portal.prototype.componentWillUnmount = function () {
        this.removeContainer();
    };
    Portal.prototype.createContainer = function () {
        if (this.props.getContainer) {
            this.container = this.props.getContainer();
        }
        else {
            this.container = this.getContainer();
        }
        this.forceUpdate();
    };
    Portal.prototype.removeContainer = function () {
        if (this.container) {
            this.container.parentNode.removeChild(this.container);
        }
    };
    Portal.prototype.render = function () {
        if (this.container) {
            return createPortal(this.props.children, this.container);
        }
        return null;
    };
    return Portal;
}(React.Component));
export default Portal;
//# sourceMappingURL=index.js.map