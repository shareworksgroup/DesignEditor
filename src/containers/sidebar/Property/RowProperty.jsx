import React from 'react';
import Group from './Group';
import { Color, Switch, Space, ImageEditor } from './items';


const RowProperty = ({ columnsBackgroundColor, backgroundColor, backgroundImage, noStackMobile, padding, fullWidth, repeat, center, _meta, onUpdate }) => <React.Fragment>
  <Group title="GENERAL">
    <Color title="Background Color" value={backgroundColor} attribute="backgroundColor" onUpdate={onUpdate} />
    <ImageEditor key={_meta.guid} attribute="backgroundImage" url={backgroundImage} fullWidth={fullWidth} repeat={repeat} center={center} options onUpdate={onUpdate} />
    <Space title="Padding" value={padding} attribute="padding" onUpdate={onUpdate} />
  </Group>
  <Group title="MOBILE">
    <Switch title="Do Not Stack on Mobile" checked={noStackMobile} attribute="noStackMobile" onUpdate={onUpdate} />
  </Group>
  <Group title="CONTENT">
    <Color title="Columns Background" value={columnsBackgroundColor} attribute="columnsBackgroundColor" onUpdate={onUpdate} />
  </Group>
</React.Fragment>;

export default RowProperty;