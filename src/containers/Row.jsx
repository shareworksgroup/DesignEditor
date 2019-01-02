import React from 'react';
import Items from './sidebar/RowItems';

class Row extends React.Component {
  render(){
    return <ul className="ds_row">
      {Items.map((Component, index) => <Component key={index} />)}
    </ul>
  }
}

export default Row;