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
import { DragType, OperationMode } from '../../../lib/enum';
import { DragSource } from 'react-dnd';
import * as Util from '../../common/DragUtil';
function ContentFactory(contentType, label, iconClass) {
    var ContentElement = /** @class */ (function (_super) {
        __extends(ContentElement, _super);
        function ContentElement() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ContentElement.prototype.render = function () {
            var _a = this.props, connectDragSource = _a.connectDragSource, key = _a.key;
            return connectDragSource(React.createElement("li", { key: key },
                React.createElement("i", { className: iconClass }),
                React.createElement("p", null, label)));
        };
        ContentElement.type = contentType;
        ContentElement = __decorate([
            DragSource(DragType.CONTENT, Util.getSource({ mode: OperationMode.INSERT, type: contentType }), Util.getCollect())
        ], ContentElement);
        return ContentElement;
    }(React.Component));
    return ContentElement;
}
export default ContentFactory;
//# sourceMappingURL=ContentFactory.js.map