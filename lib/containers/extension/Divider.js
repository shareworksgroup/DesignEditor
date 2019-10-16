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
import { Align, Slide, Space, Line } from '../sidebar/Property/items';
var Divider = /** @class */ (function (_super) {
    __extends(Divider, _super);
    function Divider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Divider.prototype.getIconClass = function () {
        return 'icon icon-divider';
    };
    Divider.prototype.getContentType = function () {
        return ContentType.DIVIDER;
    };
    Divider.prototype.getLabel = function () {
        return 'Divider';
    };
    Divider.prototype.toHtml = function (data) {
        var width = data.width, lineStyle = data.lineStyle, lineWidth = data.lineWidth, lineColor = data.lineColor, textAlign = data.textAlign, containerPadding = data.containerPadding;
        return "<div>\n      <div style=\"padding:" + containerPadding + ";text-align:" + textAlign + ";font-size:0\">\n        <div style=\"border-top:" + lineWidth + "px " + lineStyle + " " + lineColor + ";width: " + width + "%;display:inline-block;\"></div>\n      </div>\n    </div>";
    };
    Divider.prototype.getInitialAttribute = function () {
        return {
            width: 100,
            lineStyle: 'solid',
            lineWidth: 1,
            lineColor: '#ccc',
            textAlign: 'center',
            containerPadding: '10px'
        };
    };
    Divider.prototype.getProperties = function (values, update) {
        var width = values.width, lineStyle = values.lineStyle, lineWidth = values.lineWidth, lineColor = values.lineColor, textAlign = values.textAlign, containerPadding = values.containerPadding;
        return React.createElement(React.Fragment, null,
            React.createElement(Group, { title: "LINE" },
                React.createElement(Slide, { title: "Width", attribute: "width", value: width, onUpdate: update }),
                React.createElement(Line, { title: "Line", lineWidth: lineWidth, lineStyle: lineStyle, lineColor: lineColor, onUpdate: update }),
                React.createElement(Align, { align: textAlign, onUpdate: update })),
            React.createElement(Group, { title: "GENERAL" },
                React.createElement(Space, { title: "Container Padding", value: containerPadding, attribute: "containerPadding", onUpdate: update })));
    };
    Divider.prototype.render = function () {
        var _a = this.props, width = _a.width, lineStyle = _a.lineStyle, lineWidth = _a.lineWidth, lineColor = _a.lineColor, textAlign = _a.textAlign, containerPadding = _a.containerPadding;
        return React.createElement("div", { className: "ds_content_divider" },
            React.createElement("div", { className: "ds_content_divider_container", style: {
                    padding: containerPadding,
                    textAlign: textAlign,
                } },
                React.createElement("div", { style: {
                        borderTop: lineWidth + "px " + lineStyle + " " + lineColor,
                        width: width + "%",
                    } })));
    };
    return Divider;
}(Extension));
export default Divider;
//# sourceMappingURL=Divider.js.map