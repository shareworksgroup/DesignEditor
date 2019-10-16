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
export var getSource = function (data, transform) {
    if (data === void 0) { data = {}; }
    return ({
        beginDrag: function (props) {
            var item = transform ? transform(props) : {};
            return __assign({}, data, item);
        },
        canDrag: function (props) { return true; }
    });
};
export var getCollect = function () { return function (connect, monitor) { return ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
}); }; };
//# sourceMappingURL=DragUtil.js.map