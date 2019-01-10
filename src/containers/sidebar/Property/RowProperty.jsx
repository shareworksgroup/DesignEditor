import React from 'react';
import Group from './Group';
import { Link, Colors, Align, LineHeight,BorderRadius, Color, Switch, Space } from './items';

class RowProperty extends React.Component {
  render(){
    const { columnsBackgroundColor, backgroundColor, noStackMobile, padding, onUpdate } = this.props;
    return <React.Fragment>
      <Group title="GENERAL">
        <Color title="Background Color" value={backgroundColor} attribute="backgroundColor" onUpdate={onUpdate}/>
        <Space title="Padding" value={padding} attribute="padding" onUpdate={onUpdate}/>
      </Group>
      <Group title="MOBILE">
        <Switch title="Do Not Stack on Mobile" checked={noStackMobile} attribute="noStackMobile" onUpdate={onUpdate}/>
        
      </Group>
      <Group title="CONTENT">
        <Color title="Columns Background" value={columnsBackgroundColor} attribute="columnsBackgroundColor" onUpdate={onUpdate}/>
      </Group>
    </React.Fragment>
  }
}

export default RowProperty;