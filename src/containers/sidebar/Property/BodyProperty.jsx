import React from 'react';
import Group from './Group';
import { Link, Colors, Align, LineHeight,BorderRadius, Color, Switch, Space, NumberItem } from './items';

class BodyProperty extends React.Component {
  render(){
    const { backgroundColor, width, onUpdate } = this.props;
    return <React.Fragment>
      <Group title="GENERAL">
        <Color title="Background Color" value={backgroundColor} attribute="backgroundColor" onUpdate={onUpdate}/>
        <NumberItem title="Content Width" value={width} attribute="width" onUpdate={onUpdate}/>
      </Group>
    </React.Fragment>
  }
}

export default BodyProperty;