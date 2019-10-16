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
import React from 'react';
import { Input, Button } from '../../../../components';
import { guid, reOrder } from '../../../../lib/util';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
var getItemStyle = function (isDragging, draggableStyle) { return (__assign({ userSelect: 'none', background: isDragging ? '#EEF3FB' : '#fff' }, draggableStyle)); };
var SocialItem = /** @class */ (function (_super) {
    __extends(SocialItem, _super);
    function SocialItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            icon: '',
            url: '',
        };
        _this.addItem = function () {
            var _a = _this.props, items = _a.items, _b = _a.onUpdate, onUpdate = _b === void 0 ? function () { } : _b;
            if (_this.state.icon.trim() === '' || _this.state.url.trim() === '') {
                return;
            }
            onUpdate('items', items.concat([{ icon: _this.state.icon, url: _this.state.url, guid: guid() }]));
            _this.setState({ icon: '', url: '' });
        };
        _this.modifyItem = function (guid, icon, url) {
            var _a = _this.props, items = _a.items, _b = _a.onUpdate, onUpdate = _b === void 0 ? function () { } : _b;
            items.some(function (item) {
                if (item.guid === guid) {
                    item.icon = icon;
                    item.url = url;
                    return true;
                }
                return false;
            });
            onUpdate('items', items);
        };
        _this.deleteItem = function (guid) {
            var _a = _this.props, items = _a.items, _b = _a.onUpdate, onUpdate = _b === void 0 ? function () { } : _b;
            var newItems = items.filter(function (item) { return item.guid !== guid; });
            onUpdate('items', newItems);
        };
        _this.onDragEnd = function (result) {
            var _a = _this.props, items = _a.items, _b = _a.onUpdate, onUpdate = _b === void 0 ? function () { } : _b;
            if (!result.destination) {
                return;
            }
            var newItems = reOrder(items, result.source.index, result.destination.index);
            onUpdate('items', newItems);
        };
        _this.onSortEnd = function (_a) {
            var oldIndex = _a.oldIndex, newIndex = _a.newIndex;
            var _b = _this.props, items = _b.items, _c = _b.onUpdate, onUpdate = _c === void 0 ? function () { } : _c;
            if (typeof newIndex === 'undefined') {
                return;
            }
            var newItems = reOrder(items, oldIndex, newIndex);
            onUpdate('items', newItems);
        };
        return _this;
    }
    SocialItem.prototype.render = function () {
        var _this = this;
        var items = this.props.items;
        return (React.createElement("div", { className: "ds-widget ds-link-widget social-panel" },
            React.createElement("div", { className: "card-row" },
                React.createElement("div", { className: "ds-widget-label col-6" },
                    React.createElement("label", { className: "ds-label-primary" },
                        React.createElement("span", null, "Icons")))),
            React.createElement("div", { className: "card-row", style: { marginTop: 10 } },
                React.createElement("div", { className: "col-12 social-add-panel" },
                    React.createElement(Input, { addOn: "ICON", onChange: function (e) { _this.setState({ icon: e.target.value }); }, value: this.state.icon }),
                    React.createElement(Input, { addOn: "LINK", onChange: function (e) { _this.setState({ url: e.target.value }); }, value: this.state.url }),
                    React.createElement("div", { className: "social-button-wrap" },
                        React.createElement(Button, { className: "social-button", onClick: this.addItem }, "Add")))),
            React.createElement("div", { className: "card-row", style: { marginTop: 10 } },
                React.createElement(SortContainer, { onSortEnd: this.onSortEnd, useDragHandle: true }, items.map(function (value, index) { return (React.createElement(SortItem, { value: value, key: value.guid, index: index, onModifyItem: function (icon, url) { return _this.modifyItem(value.guid, icon, url); }, onDeleteItem: function () { return _this.deleteItem(value.guid); } })); })))));
    };
    return SocialItem;
}(React.Component));
var SortContainer = SortableContainer(function (_a) {
    var children = _a.children;
    return React.createElement("div", { className: "col-12" }, children);
});
var SortItem = SortableElement(function (props) {
    var value = props.value, onModifyItem = props.onModifyItem, onDeleteItem = props.onDeleteItem;
    return React.createElement("div", { key: value.guid },
        React.createElement("div", { className: "social-item-card" },
            React.createElement("div", null,
                React.createElement(DragHandle, null),
                React.createElement("img", { style: { width: 24 }, src: value.icon }),
                React.createElement("a", { href: "javascript:void(0)", className: "social-delete-button", onClick: function () { onDeleteItem(); } },
                    React.createElement("i", { className: "icon icon-trash" }))),
            React.createElement("div", { className: "col-12", style: { fontFamily: 'Courier New' } },
                React.createElement(Input, { addOn: "ICON", onChange: function (e) { onModifyItem(e.target.value, value.url); }, value: value.icon }),
                React.createElement("div", { style: { height: 5 } }),
                React.createElement(Input, { addOn: "LINK", onChange: function (e) { onModifyItem(value.icon, e.target.value); }, value: value.url }))));
});
var DragHandle = SortableHandle(function () { return React.createElement("i", { className: "drag-handler icon icon-drag-handler" }); });
export default SocialItem;
//# sourceMappingURL=SocialItem.js.map