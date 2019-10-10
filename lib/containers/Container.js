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
import { Provider } from 'mobx-react';
import rootStore from '../store/store';
import '../style/index.less';
import { Button, Divider, Html, Image, Text, Social } from './extension';
import Transform from '../lib/transform';
import { Config } from '../lib/util';
import Wrapper from './Wrapper';
window.rootStore = rootStore;
var DesignEditor = /** @class */ (function (_super) {
    __extends(DesignEditor, _super);
    function DesignEditor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.export = function () {
            var rawData = _this.getData();
            var transform = new Transform(rawData, rootStore.DesignState.getExtensions());
            return transform.toHtml();
        };
        _this.getData = function () {
            return rootStore.DesignState.getData();
        };
        _this.setData = function (json) {
            rootStore.DesignState.execCommand('setData', json);
        };
        return _this;
    }
    DesignEditor.prototype.componentDidMount = function () {
        var _a = this.props.onRef, onRef = _a === void 0 ? function () { } : _a;
        this.initConfig();
        onRef({
            export: this.export,
            getData: this.getData,
            setData: this.setData,
        });
    };
    DesignEditor.prototype.componentWillReceiveProps = function (nextProps, nextState) {
        var mentions = this.props.mentions;
        if (mentions && JSON.stringify(Config.get('mentions')) !== JSON.stringify(mentions)) {
            Config.set('mentions', mentions);
        }
    };
    DesignEditor.prototype.initConfig = function () {
        var _a = this.props, children = _a.children, imageUploadUrl = _a.imageUploadUrl, onUpload = _a.onUpload, onUploadError = _a.onUploadError, mentions = _a.mentions, contents = _a.contents;
        Config.set('imageUploadUrl', imageUploadUrl);
        onUpload && Config.set('onUpload', onUpload);
        onUploadError && Config.set('onUploadError', onUploadError);
        mentions && Config.set('mentions', mentions);
        contents && Config.set('contents', contents);
        [Button, Divider, Html, Image, Text, Social].forEach(function (Content) {
            var content = new Content({});
            var contentType = content.getContentType();
            Content.type = contentType;
            if (Config.get('contents').some(function (type) { return type === contentType; })) {
                rootStore.DesignState.addExtension(Content);
                rootStore.DesignState.setAttribute(contentType, content.getInitialAttribute());
            }
        });
        React.Children.forEach(children, function (child) {
            if (child) {
                var content = new child.type({}); // eslint-disable-line
                rootStore.DesignState.addExtensionGroup(content.props.title);
            }
        });
    };
    DesignEditor.prototype.render = function () {
        return React.createElement(Provider, { rootStore: rootStore },
            React.createElement(Wrapper, null));
    };
    return DesignEditor;
}(React.Component));
export default DesignEditor;
//# sourceMappingURL=Container.js.map