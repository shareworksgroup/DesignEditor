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
import rootStore from '../store/store';
import { DragType, OperationMode } from '../lib/enum';
import { DropTarget } from 'react-dnd';
import PlaceHolder from './common/PlaceHolder';
import Row from './editor/Row';
var target = {
    drop: function (props, monitor) {
        var item = monitor.getItem();
        if (item.mode === OperationMode.INSERT) {
            rootStore.DesignState.execCommand('addRow', item);
        }
        else if (item.mode === OperationMode.MOVE) {
            rootStore.DesignState.execCommand('moveRow', item);
        }
    },
    canDrop: function (props, monitor) {
        return monitor.isOver({ shallow: true });
    }
};
var collect = function (connect, monitor) { return ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
}); };
var Body = /** @class */ (function (_super) {
    __extends(Body, _super);
    function Body() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onBodyClick = function () {
            var DesignState = _this.props.rootStore.DesignState;
            DesignState.setSelected(null);
        };
        return _this;
    }
    Body.prototype.render = function () {
        var _a = this.props, connectDropTarget = _a.connectDropTarget, isOver = _a.isOver, canDrop = _a.canDrop, DesignState = _a.rootStore.DesignState;
        var data = DesignState.data;
        var _b = data.body.values, width = _b.width, backgroundColor = _b.backgroundColor, fontFamily = _b.fontFamily, containerPadding = _b.containerPadding;
        return connectDropTarget(React.createElement("div", { className: "ds-body design-web", onMouseUp: this.onBodyClick },
            React.createElement("div", { className: "u_body", style: {
                    backgroundColor: backgroundColor,
                    fontFamily: fontFamily,
                    padding: containerPadding
                } },
                data.body.rows.map(function (row) {
                    var meta = row.values._meta;
                    return React.createElement(Row, { width: width, key: meta.guid, guid: meta.guid, subtype: meta.subtype, cells: row.cells });
                }),
                (isOver && canDrop) && React.createElement(PlaceHolder, null))));
    };
    Body = __decorate([
        DropTarget([DragType.ROW], target, collect),
        inject('rootStore'),
        observer
    ], Body);
    return Body;
}(React.Component));
export default Body;
//# sourceMappingURL=Body.js.map