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
import PlaceHolder from '../common/PlaceHolder';
import { inject, observer } from 'mobx-react';
import { ErrorBoundary } from '../../components';
import rootStore from '../../store/store';
import { DragType, OperationMode } from '../../lib/enum';
import { DropTarget } from 'react-dnd';
import Content from './Content';
var target = {
    drop: function (props, monitor) {
        var item = monitor.getItem();
        if (item.mode === OperationMode.INSERT) {
            rootStore.DesignState.execCommand('addContent', item, props.column.values._meta);
        }
        else {
            rootStore.DesignState.execCommand('moveContent', item, null, props.guid);
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
var Column = /** @class */ (function (_super) {
    __extends(Column, _super);
    function Column() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onUpdate = function (guid, key, value) {
            var DesignState = _this.props.rootStore.DesignState;
            DesignState.updateAttribute(guid, key, value);
        };
        return _this;
    }
    Column.prototype.render = function () {
        var _this = this;
        var _a = this.props, connectDropTarget = _a.connectDropTarget, isOver = _a.isOver, column = _a.column, canDrop = _a.canDrop, guid = _a.guid, size = _a.size, DesignState = _a.rootStore.DesignState;
        var style = column.contents.length === 0 ? { position: 'absolute', top: 0, left: 0, width: '100%' } : {};
        return connectDropTarget(React.createElement("div", { className: "col-" + size + " u_column" },
            column.contents.length === 0 && React.createElement("div", { className: "ds-placeholder-empty" },
                React.createElement("span", null, "No content here. Drag content from right.")),
            column.contents.map(function (i) {
                var Extension = DesignState.getExtension(i.values._meta.subtype);
                if (!Extension) {
                    console.warn("can not parse type: " + i.values._meta.subtype);
                    return React.createElement("div", { key: i.values._meta.guid },
                        "parse ",
                        i.values._meta.subtype,
                        " failed");
                }
                return React.createElement(Content, __assign({ key: i.values._meta.guid, columnGuid: guid, guid: i.values._meta.guid, type: Extension.type }, i.values),
                    React.createElement(ErrorBoundary, null,
                        React.createElement(Extension, __assign({}, i.values, { focus: DesignState.selected === i.values._meta.guid, onUpdate: function (key, value) { return _this.onUpdate(i.values._meta.guid, key, value); } }))));
            }),
            isOver && canDrop && React.createElement(PlaceHolder, { style: style })));
    };
    Column = __decorate([
        DropTarget([DragType.CONTENT], target, collect),
        inject('rootStore'),
        observer
    ], Column);
    return Column;
}(React.Component));
export default Column;
//# sourceMappingURL=Column.js.map