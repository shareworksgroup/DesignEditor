import React from 'react';
import ReactDom from 'react-dom';
import Container, { ExtensionGroup } from './entry';
import Video from './Video';
var instance = null;
ReactDom.render(React.createElement("div", null,
    React.createElement(Container, { imageUploadUrl: "http://localhost:3001/UserFeedback/upload", onUpload: function (data) { return data.fileUrl; }, onUploadError: function (error) { return console.log(error.message); }, onRef: function (obj) { instance = obj; window.instance = obj; } },
        React.createElement(ExtensionGroup, { title: "Custom Content" },
            React.createElement(Video, null)))), document.getElementById('root'));
//# sourceMappingURL=index.js.map