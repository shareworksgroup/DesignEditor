import React from 'react';
import { inject, observer } from 'mobx-react';
import Items from './sidebar/RowItems';

@inject('rootStore')
@observer
class Row extends React.Component<IRowProps> {
  render() {
    return <ul className="ds_row">
      {Items.map((Component, index) => <Component key={index} />)}
    </ul>
  }
}

interface IRowProps {
  rootStore?: any;
}

export default Row;