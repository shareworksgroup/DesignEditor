import React from 'react';
import Group from './Group';
import { Font, Color, NumberItem, Space } from './items';

class BodyProperty extends React.Component {
  render(){
    const { backgroundColor, width, fontFamily, containerPadding, onUpdate } = this.props;
    return <React.Fragment>
      <Group title="GENERAL">
        <Color title="Background Color" value={backgroundColor} attribute="backgroundColor" onUpdate={onUpdate}/>
        <NumberItem title="Content Width" value={width} attribute="width" onUpdate={onUpdate}/>
        <Font title="Font Family" fontFamily={fontFamily} onUpdate={onUpdate}/>
        <Space title="Container Padding" value={containerPadding} attribute="containerPadding" onUpdate={onUpdate}/>
      </Group>
    </React.Fragment>
  }
}

export default BodyProperty;