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
import axios from 'axios';
import Switch from "react-switch";
import { Line } from 'rc-progress';
import { Input } from '../../../../components';
import { Config, generateIncressTimer, imgCheck } from '../../../../lib/util';
var Image = /** @class */ (function (_super) {
    __extends(Image, _super);
    function Image() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            uploading: false,
            progress: 0,
        };
        _this.onPrevent = function (e) {
            e.stopPropagation();
            e.preventDefault();
        };
        _this.onDrop = function (e) {
            var files = e.dataTransfer.files;
            if (files && files.length > 0) {
                _this.onChange({ target: { files: files } });
            }
        };
        _this.onChange = function (e) {
            if (_this.state.uploading) {
                return;
            }
            var target = e.target;
            var _a = _this.props, _b = _a.attribute, attribute = _b === void 0 ? 'url' : _b, _c = _a.onUpdate, onUpdate = _c === void 0 ? function () { } : _c;
            var file = e.target.files[0];
            if (!file || !imgCheck(file.name)) {
                return;
            }
            var formData = new FormData();
            formData.append('img', file, file.name);
            var config = {
                headers: { 'Content-Type': 'multipart/form-data' }
            };
            _this.setState({ uploading: true });
            var timer = _this.timerGenerate(5, function (progress) {
                _this.setState({ progress: progress });
            });
            axios.post(Config.get('imageUploadUrl'), formData, config).then(function (response) {
                _this.setState({ progress: 100 });
                timer.stop();
                setTimeout(function () {
                    _this.setState({ uploading: false, progress: 0 });
                }, 200);
                onUpdate(attribute, Config.get('onUpload')(response.data));
            }).catch(function (error) {
                console.log(error);
                timer.stop();
                target.value = null;
                Config.get('onUploadError')(error);
                _this.setState({ progress: 0, uploading: false });
            });
        };
        return _this;
    }
    Image.prototype.componentDidMount = function () {
        this.timerGenerate = generateIncressTimer(0, 80);
        if (this.dropzone) {
            this.dropzone.addEventListener('drop', this.onDrop);
            this.dropzone.addEventListener('dragenter', this.onPrevent);
            this.dropzone.addEventListener('dragover', this.onPrevent);
        }
    };
    Image.prototype.componentWillUnmount = function () {
        if (this.dropzone) {
            this.dropzone.removeEventListener('drop', this.onDrop);
            this.dropzone.removeEventListener('dragenter', this.onPrevent);
            this.dropzone.removeEventListener('dragover', this.onPrevent);
        }
    };
    Image.prototype.render = function () {
        var _this = this;
        var _a = this.props, _b = _a.title, title = _b === void 0 ? 'Image' : _b, desc = _a.desc, url = _a.url, _c = _a.attribute, attribute = _c === void 0 ? 'url' : _c, _d = _a.options, options = _d === void 0 ? false : _d, fullWidth = _a.fullWidth, repeat = _a.repeat, center = _a.center, _e = _a.onUpdate, onUpdate = _e === void 0 ? function () { } : _e;
        return (React.createElement("div", { className: "ds-widget ds-link-widget" },
            React.createElement("div", { className: "card-row" },
                React.createElement("div", { className: "ds-widget-label col-6" },
                    React.createElement("label", { className: "ds-label-primary" },
                        React.createElement("span", null, title))),
                React.createElement("div", { className: "col-6 text-right" },
                    React.createElement("label", { htmlFor: this.state.uploading ? '' : 'fileInput', style: { color: '#007bff', fontSize: '12px', cursor: 'pointer' } }, "Upload Image"))),
            React.createElement("div", { className: "card-row", style: { marginTop: 10 } },
                React.createElement("div", { className: "col-12" },
                    React.createElement("label", { ref: function (dom) { _this.dropzone = dom; }, className: "ds-dropzone", "aria-disabled": "false", htmlFor: this.state.uploading ? '' : 'fileInput' },
                        React.createElement("div", null,
                            !this.state.uploading && React.createElement("span", null, "Drop a new image here, or click to select files to upload."),
                            this.state.uploading && React.createElement("div", null,
                                React.createElement("p", { style: { fontSize: '12px' } }, "UPLOADING"),
                                React.createElement(Line, { percent: this.state.progress, strokeWidth: "3", strokeColor: "#0BD318" }))),
                        React.createElement("input", { id: "fileInput", onChange: this.onChange, type: "file", accept: "image/*", autoComplete: "off", style: { display: 'none' } })),
                    desc && React.createElement("div", { className: "ds-widget-hint" }, desc))),
            React.createElement("div", { className: "card-row", style: { marginTop: 10 } },
                React.createElement("div", { className: "ds-widget-label col-12" },
                    React.createElement("label", { className: "ds-label-primary" },
                        React.createElement("span", null, "Image URL")))),
            React.createElement("div", { className: "card-row", style: { marginTop: 10 } },
                React.createElement("div", { className: "col-12" },
                    React.createElement(Input, { onChange: function (e) { onUpdate(attribute, e.target.value); }, value: url }))),
            options && React.createElement(React.Fragment, null,
                React.createElement("div", { className: "card-row", style: { marginTop: 10 } },
                    React.createElement("div", { className: "ds-widget-label col-12" },
                        React.createElement("label", { className: "ds-label-primary" },
                            React.createElement("span", null, "Image Options")))),
                React.createElement("div", { className: "card-row", style: { marginTop: 10 } },
                    React.createElement("div", { className: "col-6" },
                        React.createElement("div", { className: "ds-widget-label" },
                            React.createElement("label", null,
                                React.createElement("span", { style: { position: 'relative', cursor: 'pointer', top: '-3px', marginRight: '5px' }, onClick: function () { onUpdate('fullWidth', !fullWidth); } }, "Full Width"),
                                React.createElement(Switch, { checked: fullWidth, onChange: function (checked) { onUpdate('fullWidth', checked); }, height: 17, width: 34 }))))),
                React.createElement("div", { className: "card-row", style: { marginTop: 5 } },
                    React.createElement("div", { className: "col-6" },
                        React.createElement("div", { className: "ds-widget-label" },
                            React.createElement("label", null,
                                React.createElement("span", { style: { position: 'relative', cursor: 'pointer', top: '-3px', marginRight: '5px' }, onClick: function () { onUpdate('repeat', !repeat); } }, "Repeat"),
                                React.createElement(Switch, { checked: repeat, onChange: function (checked) { onUpdate('repeat', checked); }, height: 17, width: 34 }))))),
                React.createElement("div", { className: "card-row", style: { marginTop: 5 } },
                    React.createElement("div", { className: "col-6" },
                        React.createElement("div", { className: "ds-widget-label" },
                            React.createElement("label", null,
                                React.createElement("span", { style: { position: 'relative', cursor: 'pointer', top: '-3px', marginRight: '5px' }, onClick: function () { onUpdate('fullWidth', !center); } }, "Center"),
                                React.createElement(Switch, { checked: center, onChange: function (checked) { onUpdate('center', checked); }, height: 17, width: 34 }))))))));
    };
    return Image;
}(React.Component));
export default Image;
//# sourceMappingURL=Image.js.map