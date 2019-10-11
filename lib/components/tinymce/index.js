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
import React from 'react';
import AutoComplete from './autocomplete';
import AutoCompletePanel from '../form/AutoCompletePanel';
import Portal from '../portal';
import { Config } from '../../lib/util';
import tinymce from 'tinymce';
var fn = function () { };
var Editor = /** @class */ (function (_super) {
    __extends(Editor, _super);
    function Editor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onRef = function (dom) {
            _this.dom = dom;
        };
        _this.initEditor = function () {
            var _a = _this.props, _b = _a.setup, setup = _b === void 0 ? fn : _b, _c = _a.onChange, onChange = _c === void 0 ? fn : _c, _d = _a.onRef, onRef = _d === void 0 ? fn : _d, _e = _a.config, config = _e === void 0 ? {} : _e;
            var self = _this;
            var options = Object.assign({
                target: _this.dom,
                menubar: false,
                inline: true,
                toolbar: ['fontselect fontsizeselect | bold italic underline'],
                setup: function (ed) {
                    _this.editor = ed;
                    setup(_this.editor);
                    onRef(_this.editor);
                    ed.on('keydown', function (e) {
                        if (e.keyCode === 13) {
                            e.preventDefault();
                        }
                    });
                    ed.on('change', function (e) {
                        self.currentContent = self.editor.getContent({ format: 'raw' });
                        onChange(self.editor);
                    });
                }
            }, config);
            tinymce.init(options);
        };
        return _this;
    }
    Editor.prototype.componentDidUpdate = function (_a) {
        var focus = _a.focus;
        if (this.props.focus === focus) {
            return;
        }
        if (!this.props.focus) {
            this.editor && this.editor.remove(this.dom);
            this.editor = null;
        }
        else {
            !this.editor && this.initEditor();
        }
    };
    Editor.prototype.shouldComponentUpdate = function (_a) {
        var value = _a.value, focus = _a.focus;
        if (focus !== this.props.focus || !this.props.focus) {
            return true;
        }
        if (value !== this.currentContent) {
            return true;
        }
        return false;
    };
    Editor.prototype.render = function () {
        var _a = this.props, children = _a.children, value = _a.value;
        if (React.Children.count(children) > 1) {
            throw new Error('Tinymce children must be single');
        }
        return React.cloneElement(children, {
            ref: this.onRef,
            dangerouslySetInnerHTML: { __html: value }
        });
    };
    return Editor;
}(React.Component));
var TinyMce = /** @class */ (function (_super) {
    __extends(TinyMce, _super);
    function TinyMce() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._isMounted = false;
        _this.state = {
            showDynamic: false,
            query: '',
            data: [],
            position: { x: 0, y: 0 },
        };
        _this.handleEditorChange = function (editor) {
            var onChange = _this.props.onChange;
            var content = editor.getContent({ format: 'raw' });
            var regex = /(<([^>]+)>)/ig;
            var pureContent = content.replace(regex, "");
            onChange('text', pureContent ? content : "");
        };
        _this.insertDynamic = function (value) {
            if (_this.editor) {
                Array(_this.state.query.length + 1).fill(0).forEach(function (i) {
                    _this.editor.execCommand('delete');
                });
                _this.editor.insertContent("[[" + value.key + "]]", { merge: true });
                _this.setState({ showDynamic: false, query: '' });
            }
        };
        _this.initAutoComplete = function (editor) {
            if (editor && _this.autoComplete) {
                _this.autoComplete.on(editor, /^.*#([^#]*)$/, function (result) {
                    if (result.match) {
                        _this.setState({
                            showDynamic: true,
                            position: result.position,
                            query: result.query,
                            data: Config.get('mentions').filter(function (item) { return item.key.indexOf(result.query) !== -1; })
                        });
                    }
                    else {
                        _this.setState({ showDynamic: false, query: '' });
                    }
                });
            }
        };
        _this.getContainer = function () {
            var container = document.createElement('div');
            if (_this.props.getContainer) {
                _this.props.getContainer().appendChild(container);
            }
            else {
                document.body.appendChild(container);
            }
            return container;
        };
        return _this;
    }
    TinyMce.prototype.componentDidMount = function () {
        this.autoComplete = new AutoComplete();
        this._isMounted = true;
    };
    TinyMce.prototype.componentDidUpdate = function (_a) {
        var focus = _a.focus;
        if (!this.props.focus) {
            this.autoComplete.off();
        }
    };
    TinyMce.prototype.componentWillUnmount = function () {
        if (this.autoComplete) {
            this.autoComplete.off();
        }
        this._isMounted = false;
    };
    TinyMce.prototype.render = function () {
        var _this = this;
        var _a = this.props, children = _a.children, value = _a.value, _b = _a.autoComplete, autoComplete = _b === void 0 ? true : _b, _c = _a.focus, focus = _c === void 0 ? false : _c, _d = _a.config, config = _d === void 0 ? {} : _d;
        if (React.Children.count(children) !== 1) {
            throw new Error('TinyMce need one child component to initialize content');
        }
        return React.createElement(React.Fragment, null,
            React.createElement(Editor, { config: config, value: value, onRef: function (editor) { _this.editor = editor; }, onChange: this.handleEditorChange, focus: focus, setup: this.initAutoComplete }, children),
            React.createElement(Portal, { getContainer: this.getContainer },
                React.createElement(AutoCompletePanel, { data: this.state.data, show: this.state.showDynamic, position: this.state.position, onClick: function (item) { _this.insertDynamic(item); }, onClose: function () { _this._isMounted && _this.setState({ showDynamic: false, query: '' }); } })));
    };
    return TinyMce;
}(React.Component));
export default TinyMce;
//# sourceMappingURL=index.js.map