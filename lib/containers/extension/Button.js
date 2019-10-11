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
import Extension from './Extension';
import { ContentType } from '../../lib/enum';
import Group from '../sidebar/Property/Group';
import { TinyMce } from '../../components';
import { Link, Colors, Align, LineHeight, BorderRadius, Space, Line } from '../sidebar/Property/items';
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Button.prototype.getIconClass = function () {
        return 'icon icon-button';
    };
    Button.prototype.getContentType = function () {
        return ContentType.BUTTON;
    };
    Button.prototype.getLabel = function () {
        return 'Button';
    };
    Button.prototype.toHtml = function (data) {
        var text = data.text, color = data.color, link = data.link, linkType = data.linkType, padding = data.padding, backgroundColor = data.backgroundColor, containerPadding = data.containerPadding, hoverColor = data.hoverColor, hoverBackgroundColor = data.hoverBackgroundColor, textAlign = data.textAlign, lineHeight = data.lineHeight, borderRadius = data.borderRadius, lineColor = data.lineColor, lineWidth = data.lineWidth, lineStyle = data.lineStyle, _meta = data._meta;
        var node = document.createElement('div');
        node.innerHTML = text;
        [].slice.call(node.querySelectorAll('p')).forEach(function (element) { return (element.style.display = 'inline'); });
        var html = node.innerHTML;
        return "<div>\n      <div style=\"text-align:" + textAlign + ";padding:" + containerPadding + "\">\n      <style>\n        #button_" + _meta.guid + ":hover{\n          color:" + hoverColor + " !important;\n          background-color:" + hoverBackgroundColor + " !important;\n        }\n      </style>\n      <a target=\"" + linkType + "\" href=\"" + (link || 'javascript:void(0)') + "\" id=\"button_" + _meta.guid + "\"\n        style=\"display:inline-block;text-decoration: none;cursor: " + (link ? 'pointer' : 'default') + ";\n        color:" + color + ";background-color:" + backgroundColor + ";padding:" + padding + ";line-height:" + lineHeight + "%;\n        border-radius:" + borderRadius + "px;border:" + lineWidth + "px " + lineStyle + " " + lineColor + ";\">" + html + "</a>\n      </div>\n    </div>";
    };
    Button.prototype.getInitialAttribute = function () {
        return {
            linkType: '_self',
            text: 'Text Button',
            link: '',
            color: '#fff',
            padding: '10px 20px 10px 20px',
            backgroundColor: '#3aaee0',
            hoverColor: '#FFF',
            hoverBackgroundColor: '#2a92bf',
            textAlign: "center",
            lineHeight: 120,
            borderRadius: 4,
            containerPadding: '10px',
            lineStyle: 'solid',
            lineWidth: 0,
            lineColor: '#3aaee0',
        };
    };
    Button.prototype.getProperties = function (values, update) {
        var color = values.color, linkType = values.linkType, link = values.link, backgroundColor = values.backgroundColor, hoverColor = values.hoverColor, hoverBackgroundColor = values.hoverBackgroundColor, containerPadding = values.containerPadding, padding = values.padding, textAlign = values.textAlign, lineHeight = values.lineHeight, borderRadius = values.borderRadius, lineStyle = values.lineStyle, lineWidth = values.lineWidth, lineColor = values.lineColor;
        return React.createElement(React.Fragment, null,
            React.createElement(Group, { title: "LINK" },
                React.createElement(Link, { link: link, linkType: linkType, title: "Button Link", onUpdate: update })),
            React.createElement(Group, { title: "COLORS" },
                React.createElement(Colors, { title: "Colors", colors: {
                        color: color,
                        backgroundColor: backgroundColor,
                        hoverColor: hoverColor,
                        hoverBackgroundColor: hoverBackgroundColor
                    }, onUpdate: update })),
            React.createElement(Group, { title: "SPACING" },
                React.createElement(Align, { align: textAlign, onUpdate: update }),
                React.createElement(LineHeight, { lineHeight: lineHeight, onUpdate: update }),
                React.createElement(Line, { title: "Border", lineWidth: lineWidth, lineStyle: lineStyle, lineColor: lineColor, onUpdate: update }),
                React.createElement(BorderRadius, { borderRadius: borderRadius, onUpdate: update }),
                React.createElement(Space, { title: "Padding", value: padding, attribute: "padding", onUpdate: update })),
            React.createElement(Group, { title: "GENERAL" },
                React.createElement(Space, { title: "Container Padding", value: containerPadding, attribute: "containerPadding", onUpdate: update })));
    };
    Button.prototype.render = function () {
        var _a = this.props, focus = _a.focus, text = _a.text, color = _a.color, padding = _a.padding, backgroundColor = _a.backgroundColor, containerPadding = _a.containerPadding, textAlign = _a.textAlign, lineHeight = _a.lineHeight, borderRadius = _a.borderRadius, lineStyle = _a.lineStyle, lineWidth = _a.lineWidth, lineColor = _a.lineColor, onUpdate = _a.onUpdate;
        return React.createElement("div", { className: "ds_content_button" },
            React.createElement("div", { style: {
                    textAlign: textAlign,
                    padding: containerPadding,
                } },
                React.createElement("a", { className: "mce-content-wrapper", style: {
                        color: color,
                        backgroundColor: backgroundColor,
                        padding: padding,
                        lineHeight: lineHeight + "%",
                        borderRadius: borderRadius + "px",
                        border: lineWidth + "px " + lineStyle + " " + lineColor
                    } },
                    React.createElement(TinyMce, { value: text, focus: focus, onChange: onUpdate },
                        React.createElement("p", null)))));
    };
    return Button;
}(Extension));
export default Button;
//# sourceMappingURL=Button.js.map