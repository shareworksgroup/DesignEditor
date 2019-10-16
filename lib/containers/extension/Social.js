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
import { guid } from '../../lib/util';
import Group from '../sidebar/Property/Group';
import { Align, Space, NumberItem, SocialItem } from '../sidebar/Property/items';
var Social = /** @class */ (function (_super) {
    __extends(Social, _super);
    function Social() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Social.prototype.getIconClass = function () {
        return 'icon icon-facebook';
    };
    Social.prototype.getContentType = function () {
        return ContentType.SOCIAL;
    };
    Social.prototype.getLabel = function () {
        return 'Social';
    };
    Social.prototype.toHtml = function (data) {
        var items = data.items, width = data.width, height = data.height, textAlign = data.textAlign, containerPadding = data.containerPadding, margin = data.margin;
        return "<div>\n      <div style=\"padding:" + containerPadding + ";text-align:" + textAlign + "\">\n        " + items.map(function (item) { return "<a key='" + item.guid + "' href='" + item.url + "' style='margin:" + margin + ";'>\n          <img style='height:" + height + "px;width:" + width + "px;' src='" + item.icon + "' />\n        </a>"; }).join('') + "\n      </div>\n    </div>";
    };
    Social.prototype.getInitialAttribute = function () {
        return {
            items: [
                {
                    guid: guid(),
                    icon: 'https://mktgcdn.dlvrit.com/wp-content/uploads/2017/09/social-_facebook-small-opt.png',
                    url: 'https://www.facebook.com/InvitationHomesWeb'
                },
                {
                    guid: guid(),
                    icon: 'https://img.icons8.com/color/2x/youtube-play.png',
                    url: 'https://www.youtube.com/user/InvitationHomes'
                },
                {
                    guid: guid(),
                    icon: 'https://mktgcdn.dlvrit.com/wp-content/uploads/2017/09/social-_linkedin-small-opt.png',
                    url: 'https://www.linkedin.com'
                },
                {
                    guid: guid(),
                    icon: 'https://img.icons8.com/color/2x/google-plus.png',
                    url: 'https://plus.google.com/+Invitationhomes/posts'
                },
                {
                    guid: guid(),
                    icon: 'https://mktgcdn.dlvrit.com/wp-content/uploads/2017/09/social-_twitter-small-opt.png',
                    url: 'https://twitter.com/InvitationHomes'
                }
            ],
            textAlign: 'center',
            containerPadding: '10px',
            margin: '5px',
            width: 35,
            height: 35,
        };
    };
    Social.prototype.getProperties = function (values, update) {
        var items = values.items, width = values.width, height = values.height, textAlign = values.textAlign, containerPadding = values.containerPadding, margin = values.margin;
        return React.createElement(React.Fragment, null,
            React.createElement(Group, { title: "ICONS" },
                React.createElement(SocialItem, { items: items, onUpdate: update })),
            React.createElement(Group, { title: "GENERAL" },
                React.createElement(Align, { align: textAlign, onUpdate: update }),
                React.createElement(NumberItem, { title: "Width", attribute: "width", value: width, onUpdate: update, step: 1, max: 100, min: 5 }),
                React.createElement(NumberItem, { title: "Height", attribute: "height", value: height, onUpdate: update, step: 1, max: 100, min: 5 }),
                React.createElement(Space, { title: "Margin", value: margin, attribute: "margin", onUpdate: update }),
                React.createElement(Space, { title: "Container Padding", value: containerPadding, attribute: "containerPadding", onUpdate: update })));
    };
    Social.prototype.render = function () {
        var _a = this.props, items = _a.items, width = _a.width, height = _a.height, textAlign = _a.textAlign, containerPadding = _a.containerPadding, margin = _a.margin;
        return React.createElement("div", { className: "ds_content_social" },
            React.createElement("div", { className: "ds_content_social_container", style: {
                    padding: containerPadding,
                    textAlign: textAlign,
                } }, items.map(function (item) { return React.createElement("a", { key: item.guid, href: item.url, style: {
                    margin: margin,
                } },
                React.createElement("img", { style: { width: width, height: height }, src: item.icon })); })));
    };
    return Social;
}(Extension));
export default Social;
//# sourceMappingURL=Social.js.map