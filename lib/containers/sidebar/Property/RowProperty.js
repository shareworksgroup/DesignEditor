import React from 'react';
import Group from './Group';
import { Color, Switch, Space, ImageEditor } from './items';
var RowProperty = function (_a) {
    var columnsBackgroundColor = _a.columnsBackgroundColor, backgroundColor = _a.backgroundColor, backgroundImage = _a.backgroundImage, noStackMobile = _a.noStackMobile, padding = _a.padding, fullWidth = _a.fullWidth, repeat = _a.repeat, center = _a.center, _meta = _a._meta, onUpdate = _a.onUpdate;
    return React.createElement(React.Fragment, null,
        React.createElement(Group, { title: "GENERAL" },
            React.createElement(Color, { title: "Background Color", value: backgroundColor, attribute: "backgroundColor", onUpdate: onUpdate }),
            React.createElement(ImageEditor, { key: _meta.guid, attribute: "backgroundImage", url: backgroundImage, fullWidth: fullWidth, repeat: repeat, center: center, options: true, onUpdate: onUpdate }),
            React.createElement(Space, { title: "Padding", value: padding, attribute: "padding", onUpdate: onUpdate })),
        React.createElement(Group, { title: "MOBILE" },
            React.createElement(Switch, { title: "Do Not Stack on Mobile", checked: noStackMobile, attribute: "noStackMobile", onUpdate: onUpdate })),
        React.createElement(Group, { title: "CONTENT" },
            React.createElement(Color, { title: "Columns Background", value: columnsBackgroundColor, attribute: "columnsBackgroundColor", onUpdate: onUpdate })));
};
export default RowProperty;
//# sourceMappingURL=RowProperty.js.map