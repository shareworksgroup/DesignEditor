import React from 'react';
import classnames from 'classnames';
import { inject, observer } from 'mobx-react';
import Content from './Content';
import Row from './Row';
import { Tabs } from '../components';
import Property from './sidebar/Property/Property';

class SideBar extends React.Component {
  state={
    active: 0
  }
  onTabClick = () => {
    const { rootStore: { DesignState } } = this.props;
    DesignState.setSelected(null);
    console.log('sidebar click')
  }
  render(){
    const { rootStore: { DesignState } } = this.props;
    return <div className="ds_sidebar">
      <Tabs onClick={this.onTabClick}>
        <Tabs.Tab tab="Content"><Content /></Tabs.Tab>
        <Tabs.Tab tab="Row"><Row /></Tabs.Tab>
        <Tabs.Tab tab="Body">Body</Tabs.Tab>
      </Tabs>
      <Property visible={!!DesignState.selected} propertyId={DesignState.selected} destroyOnClose/>
    </div>;
  }
}

export default inject('rootStore')(observer(SideBar));