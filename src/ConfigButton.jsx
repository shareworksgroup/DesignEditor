import React from 'react';
import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.min.css';


const fn = () => { };
class ConfigButton extends React.Component {
  render() {
    const { onSave = fn, onPreview = fn } = this.props;
    return <Fab
      mainButtonStyles={{ backgroundColor: '#84D945' }}
      position={{ bottom: 20, right: 20 }}
      icon={<i className="mdi-content-add"></i>}
      event="click"
    >
      <Action
        text="Preview"
        onClick={onPreview}
        style={{ backgroundColor: '#539225' }}
      >
        <i className="mdi-image-remove-red-eye"></i>
      </Action>
    </Fab>
  }
}

export default ConfigButton;