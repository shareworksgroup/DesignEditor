import React from 'react';
import { inject, observer } from 'mobx-react';
import Items from './sidebar/RowItems';

class Row extends React.Component {
  render(){
    return <ul className="ds_row">
      {Items.map((Component, index) => <Component key={index} />)}
    </ul>
  }
}

export default inject('rootStore')(observer(Row));