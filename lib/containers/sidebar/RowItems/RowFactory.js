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
function RowFactory(rowType, segmentations) {
    if (segmentations === void 0) { segmentations = [1]; }
    var RowElement = /** @class */ (function (_super) {
        __extends(RowElement, _super);
        function RowElement() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RowElement.prototype.render = function () {
            var connectDragSource = this.props.connectDragSource;
            var total = segmentations.reduce(function (i, total) { return i + total; }, 0);
            return connectDragSource(React.createElement("li", null, segmentations.map(function (i, index) {
                return (React.createElement("div", { key: index, className: "ds-row-column col-" + (12 * i / total).toString().replace('.', '') },
                    React.createElement("div", { className: "ds-row-content" })));
            })));
        };
        RowElement.type = rowType;
        RowElement = __decorate([
            DragSource(DragType.ROW, Util.getSource({ mode: OperationMode.INSERT, type: rowType, cells: segmentations }), Util.getCollect())
        ], RowElement);
        return RowElement;
    }(React.Component));
    return RowElement;
}
export default RowFactory;
//# sourceMappingURL=RowFactory.js.map