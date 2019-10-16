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
import { HtmlEditor, Space } from '../sidebar/Property/items';
var Html = /** @class */ (function (_super) {
    __extends(Html, _super);
    function Html() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Html.prototype.getIconClass = function () {
        return 'icon icon-html';
    };
    Html.prototype.getContentType = function () {
        return ContentType.HTML;
    };
    Html.prototype.getLabel = function () {
        return 'Html';
    };
    Html.prototype.toHtml = function (data) {
        var html = data.html, containerPadding = data.containerPadding;
        return "<div>\n      <div style=\"padding:" + containerPadding + ";\">\n        <div>" + html + "</div>\n      </div>\n    </div>";
    };
    Html.prototype.getInitialAttribute = function () {
        return {
            html: '<p>Html Sample</p>',
            containerPadding: '10px'
        };
    };
    Html.prototype.getProperties = function (values, update) {
        var html = values.html, containerPadding = values.containerPadding;
        return React.createElement(React.Fragment, null,
            React.createElement(Group, { title: "LINE" },
                React.createElement(HtmlEditor, { style: { margin: '-20px' }, value: html, onChange: function (value) { update('html', value); } })),
            React.createElement(Group, { title: "GENERAL" },
                React.createElement(Space, { title: "Container Padding", value: containerPadding, attribute: "containerPadding", onUpdate: update })));
    };
    Html.prototype.render = function () {
        var _a = this.props, html = _a.html, containerPadding = _a.containerPadding;
        return React.createElement("div", { className: "ds_content_html" },
            React.createElement("div", { style: {
                    padding: containerPadding
                } },
                React.createElement("div", { dangerouslySetInnerHTML: { __html: html } })));
    };
    return Html;
}(Extension));
export default Html;
//# sourceMappingURL=Html.js.map