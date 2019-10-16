import History from 'immutable-undo';
import debounce from 'lodash/debounce';
var UndoRedeo = /** @class */ (function () {
    function UndoRedeo() {
        var _this = this;
        this.registerUndoRedo = function () {
            document.addEventListener('keydown', _this.undoRedo);
        };
        this.undoRedo = function (e) {
            if (!_this.store) {
                return;
            }
            if (e.which === 89 && e.ctrlKey) {
                _this.history.redo(_this.store.getData());
                if (_this.history.canRedo) {
                    var data = _this.history.next;
                    _this.history = _this.history.redo(_this.store.getData());
                    _this.store.setData(data);
                }
            }
            else if (e.which === 90 && e.ctrlKey) {
                if (_this.history.canUndo) {
                    var data = _this.history.previous;
                    _this.history = _this.history.undo(_this.store.getData());
                    _this.store.setData(data);
                }
            }
        };
        this.history = History.create({
            maxUndos: 5000
        });
        this.registerUndoRedo();
    }
    UndoRedeo.prototype.setStore = function (store) {
        this.store = store;
    };
    UndoRedeo.prototype.getStore = function () {
        return this.store;
    };
    UndoRedeo.prototype.recordHistory = function () {
        var data = this.store.getData();
        this.history = this.history.push(data);
    };
    return UndoRedeo;
}());
var undoRedo = new UndoRedeo();
export var record = function (delay) { return function (target, key, descripter) {
    var recordHistory = null;
    if (delay) {
        recordHistory = debounce(undoRedo.recordHistory.bind(undoRedo), delay, { leading: true, trailing: false });
    }
    else {
        recordHistory = undoRedo.recordHistory.bind(undoRedo);
    }
    return {
        value: function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (!undoRedo.getStore()) {
                undoRedo.setStore(this);
            }
            recordHistory();
            return descripter.value.apply(this, args);
        }
    };
}; };
//# sourceMappingURL=history.js.map