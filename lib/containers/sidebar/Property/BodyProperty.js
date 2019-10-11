import React from 'react';
import Group from './Group';
import { Font, Color, NumberItem, Space } from './items';
var BodyProperty = function (_a) {
    var backgroundColor = _a.backgroundColor, width = _a.width, fontFamily = _a.fontFamily, containerPadding = _a.containerPadding, onUpdate = _a.onUpdate;
    return React.createElement(React.Fragment, null,
        React.createElement(Group, { title: "GENERAL" },
            React.createElement(Color, { title: "Background Color", value: backgroundColor, attribute: "backgroundColor", onUpdate: onUpdate }),
            React.createElement(NumberItem, { title: "Content Width", value: width, max: 3000, attribute: "width", onUpdate: onUpdate }),
            React.createElement(Font, { title: "Font Family", fontFamily: fontFamily, onUpdate: onUpdate }),
            React.createElement(Space, { title: "Container Padding", value: containerPadding, attribute: "containerPadding", onUpdate: onUpdate })));
};
export default BodyProperty;
//# sourceMappingURL=BodyProperty.js.map