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
import { ContentType, Fonts } from '../../lib/enum';
import Group from '../sidebar/Property/Group';
import { TinyMce } from '../../components';
import { Align, LineHeight, Color, Space } from '../sidebar/Property/items';
var Text = /** @class */ (function (_super) {
    __extends(Text, _super);
    function Text() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Text.prototype.getIconClass = function () {
        return 'icon icon-text';
    };
    Text.prototype.getContentType = function () {
        return ContentType.TEXT;
    };
    Text.prototype.getLabel = function () {
        return 'Text';
    };
    Text.prototype.toHtml = function (data) {
        var text = data.text, textAlign = data.textAlign, lineHeight = data.lineHeight, containerPadding = data.containerPadding, color = data.color;
        return "<div>\n      <div style=\"text-align:" + textAlign + ";color:" + color + ";line-height:" + lineHeight + "%;padding:" + containerPadding + "\">\n        <p>" + text + "</p>\n      </div>\n    </div>";
    };
    Text.prototype.getInitialAttribute = function () {
        return {
            color: '#000',
            text: '<p>Hello World</p>',
            textAlign: 'center',
            lineHeight: 120,
            padding: '5px 10px 10px 10px',
            containerPadding: '10px'
        };
    };
    Text.prototype.getProperties = function (values, update) {
        var color = values.color, textAlign = values.textAlign, lineHeight = values.lineHeight, containerPadding = values.containerPadding;
        return React.createElement(React.Fragment, null,
            React.createElement(Group, { title: "TEXT" },
                React.createElement(Color, { title: "Color", value: color, attribute: "color", onUpdate: update }),
                React.createElement(Align, { align: textAlign, onUpdate: update }),
                React.createElement(LineHeight, { lineHeight: lineHeight, onUpdate: update })),
            React.createElement(Group, { title: "GENERAL" },
                React.createElement(Space, { title: "Container Padding", value: containerPadding, attribute: "containerPadding", onUpdate: update })));
    };
    Text.prototype.render = function () {
        var _a = this.props, _b = _a.focus, focus = _b === void 0 ? false : _b, text = _a.text, textAlign = _a.textAlign, lineHeight = _a.lineHeight, containerPadding = _a.containerPadding, color = _a.color, _meta = _a._meta, onUpdate = _a.onUpdate;
        return React.createElement("div", { className: "ds_content_text" },
            React.createElement("div", { id: "id_" + _meta.guid, style: {
                    textAlign: textAlign,
                    color: color,
                    lineHeight: lineHeight + "%",
                    padding: containerPadding,
                } },
                React.createElement(TinyMce, { config: {
                        plugins: ['link', 'textcolor', 'colorpicker', 'lists', 'autolink'],
                        toolbar: ['undo redo | bold italic underline | fontselect fontsizeselect',
                            'forecolor backcolor | alignleft aligncenter alignright alignfull | numlist bullist outdent indent | link unlink'],
                        font_formats: (function () { return Object.keys(Fonts).map(function (i) { return i + "=" + Fonts[i]; }).join(';'); })(),
                        fontsize_formats: '8px 10px 12px 14px 16px 18px 20px 24px 26px 28px 30px 36px 40px 44px 48px 60px 72px',
                    }, value: text, focus: focus, onChange: onUpdate },
                    React.createElement("div", null))));
    };
    return Text;
}(Extension));
export default Text;
//# sourceMappingURL=Text.js.map