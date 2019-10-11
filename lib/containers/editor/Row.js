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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import React from 'react';
import { findDOMNode } from 'react-dom';
import { inject, observer } from 'mobx-react';
import { DropTarget, DragSource } from 'react-dnd';
import Throttle from 'lodash-decorators/throttle';
import classnames from 'classnames';
import rootStore from '../../store/store';
import Column from './Column';
import PlaceHolder from '../common/PlaceHolder';
import Selector from '../common/Selector';
import { DragType, OperationMode, Position } from '../../lib/enum';
import { getPositionByMiddleOffset, defaultPosition } from '../../lib/util';
import * as Util from '../common/DragUtil';
var target = {
    drop: function (props, monitor) {
        var item = monitor.getItem();
        if (item.mode === OperationMode.INSERT) {
            rootStore.DesignState.execCommand('insertRow', item, props.guid, item.position);
        }
        else if (item.mode === OperationMode.MOVE) {
            item.guid !== props.guid && rootStore.DesignState.execCommand('moveRow', item, props.guid, item.position);
        }
    },
    hover: function (props, monitor, component) {
        var dom = findDOMNode(component);
        var position = getPositionByMiddleOffset(dom, monitor.getClientOffset());
        monitor.getItem().position = position;
        component.getDecoratedComponentInstance().wrappedInstance.setPosition(position);
    },
    canDrop: function (props, monitor) {
        var item = monitor.getItem();
        if (props.guid === item.guid) {
            return false;
        }
        return true;
    }
};
var collect = function (connect, monitor) { return ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
}); };
var Row = /** @class */ (function (_super) {
    __extends(Row, _super);
    function Row(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            position: defaultPosition
        };
        _this.onSelect = function (e) {
            e.stopPropagation();
            var _a = _this.props, guid = _a.guid, DesignState = _a.rootStore.DesignState;
            DesignState.setSelected(guid);
        };
        _this.onDelete = function () {
            var _a = _this.props, guid = _a.guid, DesignState = _a.rootStore.DesignState;
            DesignState.execCommand('deleteRow', guid);
        };
        _this.onCopy = function () {
            var _a = _this.props, guid = _a.guid, DesignState = _a.rootStore.DesignState;
            DesignState.execCommand('copyRow', guid);
        };
        _this.guid = props.guid;
        _this.subtype = props.subtype;
        return _this;
    }
    Row.prototype.setPosition = function (position) {
        this.setState({ position: position });
    };
    Row.prototype.render = function () {
        var _a = this.props, connectDropTarget = _a.connectDropTarget, connectDragSource = _a.connectDragSource, isOver = _a.isOver, canDrop = _a.canDrop, width = _a.width, _b = _a.cells, cells = _b === void 0 ? [] : _b, guid = _a.guid, DesignState = _a.rootStore.DesignState;
        var row = DesignState.getRow(guid);
        if (!row) {
            return null;
        }
        var _c = row.values, backgroundColor = _c.backgroundColor, columnsBackgroundColor = _c.columnsBackgroundColor, padding = _c.padding, backgroundImage = _c.backgroundImage, fullWidth = _c.fullWidth, repeat = _c.repeat, center = _c.center;
        var bgStyle = {
            backgroundImage: "url(" + backgroundImage + ")",
            backgroundRepeat: "" + (repeat ? 'repeat' : 'no-repeat'),
            backgroundPosition: "" + (center ? 'center top' : 'left top'),
        };
        var wrapperStyle = fullWidth ? bgStyle : {};
        var contentStyle = fullWidth ? {} : bgStyle;
        var total = cells.reduce(function (i, total) { return i + total; }, 0);
        return React.createElement("div", null,
            isOver && canDrop && this.state.position === Position.BEFORE && React.createElement(PlaceHolder, null),
            connectDropTarget(React.createElement("div", { className: classnames("ds-layer ds-layer-selectable", (guid === DesignState.selected) && 'ds-layer-selected'), onMouseUp: this.onSelect },
                React.createElement(Selector, { type: "row", onDelete: this.onDelete, onCopy: this.onCopy, onRef: function (dom) { connectDragSource(dom); } }),
                React.createElement("div", { className: "u_row", style: __assign({ backgroundColor: backgroundColor,
                        padding: padding }, wrapperStyle) },
                    React.createElement("div", { className: "container", style: __assign({ maxWidth: width }, contentStyle) },
                        React.createElement("div", { className: "row", style: {
                                backgroundColor: columnsBackgroundColor,
                            } }, cells.map(function (i, index) { return (React.createElement(Column, { guid: row.columns[index].values._meta.guid, key: row.columns[index].values._meta.guid, column: row.columns[index], size: (12 * i / total).toString().replace('.', '') })); })))))),
            isOver && canDrop && this.state.position === Position.AFTER && React.createElement(PlaceHolder, null));
    };
    __decorate([
        Throttle(150),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Row.prototype, "setPosition", null);
    Row = __decorate([
        DropTarget([DragType.ROW], target, collect),
        DragSource(DragType.ROW, Util.getSource({ mode: OperationMode.MOVE, position: Position.BEFORE }, function (props) { return ({ guid: props.guid, type: props.subtype }); }), Util.getCollect()),
        inject('rootStore'),
        observer,
        __metadata("design:paramtypes", [Object])
    ], Row);
    return Row;
}(React.Component));
export default Row;
//# sourceMappingURL=Row.js.map