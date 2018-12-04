import React from 'react';

class PlaceHolder extends React.Component {
  render(){
    const { style = {} } = this.props;
    return <div className="ds_placeholder" style={style}>
      <span>Drag it here</span>
    </div>;
  }
}

export default PlaceHolder;