import React from 'react';
import Items from './ContentItems';

class Content extends React.Component {
  render(){
    return <ul className="ds_content">
      {Items.map((Component, index) => <Component key={index}/>)}
    </ul>
  }
}

export default Content;