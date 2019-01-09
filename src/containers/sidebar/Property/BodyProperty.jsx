import React from 'react';
import Group from './Group';
import { Font, Color, NumberItem } from './items';

class BodyProperty extends React.Component {
  render(){
    const { backgroundColor, width, fontFamily, onUpdate } = this.props;
    return <React.Fragment>
      <Group title="GENERAL">
        <Color title="Background Color" value={backgroundColor} attribute="backgroundColor" onUpdate={onUpdate}/>
        <NumberItem title="Content Width" value={width} attribute="width" onUpdate={onUpdate}/>
        <Font title="Font Family" fontFamily={fontFamily} onUpdate={onUpdate}/>
      </Group>
    </React.Fragment>
  }
}

export default BodyProperty;