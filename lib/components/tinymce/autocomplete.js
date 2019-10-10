var AutoComplete = /** @class */ (function () {
    function AutoComplete() {
        var _this = this;
        this.editor = null;
        this.matchReg = null;
        this.callback = null;
        this.onInput = function () {
            var offset = _this.editor.selection.getRng().endOffset;
            var text = _this.editor.selection.getSel().anchorNode.data;
            if (!text) {
                return;
            }
            var match = text.slice(0, offset)
                .match(_this.matchReg);
            if (match) {
                var rect = _this.editor.selection.getBoundingClientRect();
                _this.callback({
                    match: true,
                    query: match[1] || '',
                    position: {
                        x: rect.left,
                        y: rect.top
                    }
                });
            }
            else {
                _this.callback({
                    match: false,
                });
            }
        };
    }
    AutoComplete.prototype.on = function (editor, matchReg, callback) {
        if (callback === void 0) { callback = function () { }; }
        if (!editor || !matchReg) {
            throw new Error('please provide editor or match RegExp argument');
        }
        if (this.editor) {
            return;
        }
        this.editor = editor;
        this.matchReg = matchReg;
        this.callback = callback;
        editor.on('Input', this.onInput);
    };
    AutoComplete.prototype.off = function () {
        if (!this.editor) {
            return;
        }
        try {
            this.editor.off('Input');
        }
        catch (e) {
        }
        this.editor = null;
        this.matchReg = null;
        this.callback = null;
    };
    return AutoComplete;
}());
export default AutoComplete;
//# sourceMappingURL=autocomplete.js.map