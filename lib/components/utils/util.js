var targetMapping = [];
var _onDocumentClick = function (e) {
    targetMapping.forEach(function (obj) {
        if (e.target === obj.target || Util.isParent(e.target, obj.target))
            return;
        obj.callbacks.forEach(function (callback) { return callback(); });
    });
};
window.document.body.addEventListener('click', _onDocumentClick);
var Util = {
    isParent: function (obj, parentObj) {
        while (obj !== undefined && obj != null && obj.tagName && obj.tagName.toUpperCase() !== 'BODY') {
            if (obj === parentObj) {
                return true;
            }
            // eslint-disable-next-line no-param-reassign
            obj = obj.parentNode;
        }
        return false;
    },
    outClick: function (target, callback) {
        var callbacks = targetMapping.filter(function (item) { return item.target === target; });
        if (callbacks.length > 0) {
            callbacks[0].callbacks.push(callback);
        }
        else {
            targetMapping.push({
                target: target,
                callbacks: [callback],
            });
        }
        return {
            cancel: function () {
                targetMapping = targetMapping.filter(function (item) { return item.target !== target; });
            }
        };
    },
    canceloutClick: function (target) {
        targetMapping = targetMapping.filter(function (item) { return item.target !== target; });
    }
};
export default Util;
//# sourceMappingURL=util.js.map