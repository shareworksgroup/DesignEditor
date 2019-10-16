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
import Group from '../sidebar/Property/Group';
import { Space, Link, Align, Input, Switch, ImageEditor, NumberItem } from '../sidebar/Property/items';
import Extension from './Extension';
import { ContentType } from '../../lib/enum';
var Image = /** @class */ (function (_super) {
    __extends(Image, _super);
    function Image() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Image.prototype.getIconClass = function () {
        return 'icon icon-image';
    };
    Image.prototype.getContentType = function () {
        return ContentType.IMAGE;
    };
    Image.prototype.getLabel = function () {
        return 'Image';
    };
    Image.prototype.toHtml = function (data) {
        var url = data.url, containerPadding = data.containerPadding, link = data.link, linkType = data.linkType, textAlign = data.textAlign, alter = data.alter, fullWidth = data.fullWidth, width = data.width, height = data.height;
        var imgWidthStyle = fullWidth ? " width: 100% " : width === -1 ? " max-width: 100% " : " width: " + width + "px ";
        var imgHeightStyle = fullWidth ? "" : height === -1 ? "" : "height:" + height + "px";
        return "<div \n    style=\"padding:" + containerPadding + "\">\n      <div style=\"text-align:" + textAlign + "\">\n        <a href=\"" + (link || 'javascript:void(0)') + "\" style=\"text-decoration: none; cursor: " + (link ? 'pointer' : 'default') + "\"\n        target=\"" + linkType + "\"><img alt=\"" + alter + "\" src=\"" + url + "\" style=\"" + [imgWidthStyle, imgHeightStyle].join(';') + "\" /></a>\n      </div>\n    </div>";
    };
    Image.prototype.getInitialAttribute = function () {
        return {
            link: '',
            linkType: '_self',
            containerPadding: '10px',
            textAlign: 'center',
            fullWidth: false,
            alter: 'Image',
            url: '',
            width: -1,
            height: -1,
        };
    };
    Image.prototype.getProperties = function (values, update) {
        var link = values.link, linkType = values.linkType, alter = values.alter, fullWidth = values.fullWidth, textAlign = values.textAlign, url = values.url, containerPadding = values.containerPadding, width = values.width, height = values.height;
        return React.createElement(React.Fragment, null,
            React.createElement(Group, { title: "IMAGE" },
                React.createElement(ImageEditor, { key: values._meta.guid, url: url, attribute: "url", onUpdate: update }),
                React.createElement(Switch, { title: "Full Width", checked: fullWidth, attribute: "fullWidth", onUpdate: update }),
                !fullWidth && React.createElement(React.Fragment, null,
                    React.createElement(NumberItem, { title: "Width(-1 is auto)", attribute: "width", value: width, onUpdate: update, step: 1, max: 800, min: -1 }),
                    React.createElement(NumberItem, { title: "Height(-1 is auto)", attribute: "height", value: height, onUpdate: update, step: 1, max: 800, min: -1 })),
                React.createElement(Align, { title: "Align", align: textAlign, onUpdate: update }),
                React.createElement(Input, { title: "Alternate Text", value: alter, attribute: "alter", onUpdate: update })),
            React.createElement(Group, { title: "ACTION" },
                React.createElement(Link, { link: link, linkType: linkType, title: "Image Link", onUpdate: update })),
            React.createElement(Group, { title: "GENERAL" },
                React.createElement(Space, { title: "Container Padding", value: containerPadding, attribute: "containerPadding", onUpdate: update })));
    };
    Image.prototype.render = function () {
        var _a = this.props, url = _a.url, containerPadding = _a.containerPadding, textAlign = _a.textAlign, alter = _a.alter, fullWidth = _a.fullWidth, height = _a.height, width = _a.width;
        var imgWidthStyle = fullWidth ? { width: '100%' } : width === -1 ? { maxWidth: '100%' } : { width: width };
        var imgHeightStyle = fullWidth ? {} : height === -1 ? {} : { height: height };
        return React.createElement("div", { className: "ds_content_image", style: {
                padding: containerPadding,
            } },
            React.createElement("div", { style: {
                    textAlign: textAlign,
                } }, url ? React.createElement("img", { alt: alter, src: url, style: __assign({ verticalAlign: 'top' }, imgWidthStyle, imgHeightStyle) }) : React.createElement("p", null, "IMAGE")));
    };
    return Image;
}(Extension));
export default Image;
//# sourceMappingURL=Image.js.map