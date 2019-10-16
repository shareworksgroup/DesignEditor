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
import { Extension, PropertyWidget, PropertyGroup } from './entry';
var Space = PropertyWidget.Space, Align = PropertyWidget.Align, Input = PropertyWidget.Input, Switch = PropertyWidget.Switch;
var Video = /** @class */ (function (_super) {
    __extends(Video, _super);
    function Video() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Video.prototype.getIconClass = function () {
        return 'icon icon-video';
    };
    Video.prototype.getContentType = function () {
        return 'video';
    };
    Video.prototype.getLabel = function () {
        return 'Video';
    };
    Video.prototype.toHtml = function (data) {
        var url = data.url, containerPadding = data.containerPadding, textAlign = data.textAlign, fullWidth = data.fullWidth;
        var videoStyle = fullWidth ? " width: 100% " : " max-width: 100% ";
        return "<div style=\"padding:" + containerPadding + "\">\n      <div style=\"text-align:" + textAlign + "\">\n        <video controls src=\"" + url + "\" style=\"" + videoStyle + ";vertical-align: top;\" />\n      </div>\n    </div>";
    };
    Video.prototype.getInitialAttribute = function () {
        return {
            containerPadding: '10px',
            textAlign: 'center',
            fullWidth: false,
            url: ''
        };
    };
    Video.prototype.getProperties = function (values, update) {
        var url = values.url, textAlign = values.textAlign, containerPadding = values.containerPadding, fullWidth = values.fullWidth;
        return React.createElement(React.Fragment, null,
            React.createElement(PropertyGroup, { title: "LINK" },
                React.createElement(Input, { title: "Video URL", value: url, attribute: "url", desc: "Add a YouTube or Vimeo URL to automatically generate a preview image. The image will link to the provided URL.", onUpdate: update })),
            React.createElement(PropertyGroup, { title: "SPACING" },
                React.createElement(Switch, { title: "Full Width", checked: fullWidth, attribute: "fullWidth", onUpdate: update }),
                React.createElement(Align, { title: "Align", align: textAlign, onUpdate: update })),
            React.createElement(PropertyGroup, { title: "GENERAL" },
                React.createElement(Space, { title: "Container Padding", value: containerPadding, attribute: "containerPadding", onUpdate: update })));
    };
    Video.prototype.render = function () {
        var _a = this.props, url = _a.url, containerPadding = _a.containerPadding, textAlign = _a.textAlign, fullWidth = _a.fullWidth;
        var videoStyle = fullWidth ? { width: '100%' } : { maxWidth: '100%' };
        return React.createElement("div", { className: "ds_content_video", style: {
                padding: containerPadding,
            } },
            React.createElement("div", { style: {
                    textAlign: textAlign
                } }, url ? React.createElement("video", { controls: true, src: url, style: __assign({}, videoStyle, { verticalAlign: 'top' }) }) : React.createElement("p", null,
                React.createElement("i", { className: "icon icon-play-button" }))));
    };
    return Video;
}(Extension));
export default Video;
//# sourceMappingURL=Video.js.map