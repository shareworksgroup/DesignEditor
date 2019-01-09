import React from 'react';
import classnames from 'classnames';
import { inject, observer } from 'mobx-react';
import Content from './Content';
import Row from './Row';
import { Tabs } from '../components';
import Property from './sidebar/Property/Property';
import BodyProperty from './sidebar/Property/BodyProperty';

class SideBar extends React.Component {
  state={
    active: 0
  }

  
  onUpdate = (key, value) => {
    const { rootStore: { DesignState }} = this.props;
    DesignState.updateBodyAttribute(key, value);
  }

  onTabClick = () => {
    const { rootStore: { DesignState } } = this.props;
    DesignState.setSelected(null);
    console.log('sidebar click')
  }
  render(){
    const { rootStore: { DesignState } } = this.props;
    const body = DesignState.data.body.values;
    return <div className="ds_sidebar">
      <Tabs onClick={this.onTabClick}>
        <Tabs.Tab tab="Content" icon="mdi-action-dashboard"><Content /></Tabs.Tab>
        <Tabs.Tab tab="Row" icon="mdi-action-view-headline"><Row /></Tabs.Tab>
        <Tabs.Tab tab="Body" icon="mdi-action-payment">
          <div className="property-panel body-property-panel">
            <BodyProperty {...body} onUpdate={this.onUpdate}/>
          </div>
        </Tabs.Tab>
      </Tabs>
      <Property visible={!!DesignState.selected} propertyId={DesignState.selected} destroyOnClose/>
    </div>;
  }
}

export default inject('rootStore')(observer(SideBar));