import React from 'react';
import { inject, observer } from 'mobx-react';
import Items from './sidebar/ContentItems';
import ContentFactory from './sidebar/ContentItems/ContentFactory';

class Content extends React.Component {
  render(){
    const { rootStore } = this.props;
    return <ul className="ds_content">
      {rootStore.DesignState.extensions.map((Extension) => {
        const instance = new Extension();
        return ContentFactory(instance.getContentType(), instance.getLabel(), instance.getIconClass());
      })
        .map((Component, index) => <Component key={index}/>)}
    </ul>
  }
}

export default inject('rootStore')(observer(Content));