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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import React from 'react';
import { findDOMNode } from 'react-dom';
import classnames from 'classnames';
import Throttle from 'lodash-decorators/throttle';
import { inject, observer } from 'mobx-react';
import { DropTarget, DragSource } from 'react-dnd';
import rootStore from '../../store/store';
import PlaceHolder from '../common/PlaceHolder';
import Selector from '../common/Selector';
import { DragType, OperationMode, Position } from '../../lib/enum';
import { getPositionByMiddleOffset, defaultPosition } from '../../lib/util';
import * as Util from '../common/DragUtil';
var target = {
    drop: function (props, monitor) {
        var item = monitor.getItem();
        if (item.mode === OperationMode.INSERT) {
            rootStore.DesignState.execCommand('insertContent', monitor.getItem(), props.guid, props.columnGuid, monitor.getItem().position);
        }
        else if (item.mode === OperationMode.MOVE) {
            item.guid !== props.guid && rootStore.DesignState.execCommand('moveContent', item, props.guid, props.columnGuid, monitor.getItem().position);
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
    canDrop: monitor.canDrop()
}); };
var Content = /** @class */ (function (_super) {
    __extends(Content, _super);
    function Content(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            position: defaultPosition
        };
        _this.onSelect = function (e) {
            var _a = _this.props, guid = _a.guid, DesignState = _a.rootStore.DesignState;
            DesignState.setSelected(guid);
            e.stopPropagation();
        };
        _this.onDelete = function () {
            var _a = _this.props, guid = _a.guid, DesignState = _a.rootStore.DesignState;
            DesignState.execCommand('deleteContent', guid);
        };
        _this.onCopy = function () {
            var _a = _this.props, guid = _a.guid, DesignState = _a.rootStore.DesignState;
            DesignState.execCommand('copyContent', guid);
        };
        _this.guid = props.guid;
        _this.subtype = props.subtype;
        return _this;
    }
    Content.prototype.componentDidMount = function () {
        this._isMounted = true;
    };
    Content.prototype.componentWillUnmount = function () {
        this._isMounted = false;
    };
    Content.prototype.setPosition = function (position) {
        this._isMounted && this.setState({ position: position });
    };
    Content.prototype.render = function () {
        var _a = this.props, connectDropTarget = _a.connectDropTarget, connectDragSource = _a.connectDragSource, isOver = _a.isOver, canDrop = _a.canDrop, children = _a.children, guid = _a.guid, DesignState = _a.rootStore.DesignState;
        return React.createElement("div", null,
            isOver && canDrop && this.state.position === Position.BEFORE && React.createElement(PlaceHolder, null),
            connectDropTarget(React.createElement("div", { className: classnames("ds-layer ds-layer-selectable", (guid === DesignState.selected) && 'ds-layer-selected'), onMouseUp: this.onSelect },
                React.createElement(Selector, { type: "content", onRef: function (dom) { connectDragSource(dom); }, placeholder: "Content", onDelete: this.onDelete, onCopy: this.onCopy }),
                children)),
            isOver && canDrop && this.state.position === Position.AFTER && React.createElement(PlaceHolder, null));
    };
    __decorate([
        Throttle(150),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Content.prototype, "setPosition", null);
    Content = __decorate([
        DropTarget([DragType.CONTENT], target, collect),
        DragSource(DragType.CONTENT, Util.getSource({ mode: OperationMode.MOVE, position: defaultPosition }, function (props) { return ({ guid: props.guid, type: props.type }); }), Util.getCollect()),
        inject('rootStore'),
        observer,
        __metadata("design:paramtypes", [Object])
    ], Content);
    return Content;
}(React.Component));
export default Content;
//# sourceMappingURL=Content.js.map