import React from 'react';
import { inject, observer } from 'mobx-react';
import ContentFactory from './sidebar/ContentItems/ContentFactory';
import Group from './sidebar/Property/Group';

@inject('rootStore')
@observer
class Content extends React.Component<IContentProps> {
  render() {
    const { rootStore } = this.props;
    const extensionGroups = rootStore.DesignState.getExtensionGroups();
    return extensionGroups.map(group => <Group key={group} title={group} className="content-card">
      <ul className="ds_content">
        {rootStore.DesignState.extensions.filter(extension => extension.group === group).map(Extension => {
          const instance = new Extension();
          return ContentFactory(instance.getContentType(), instance.getLabel(), instance.getIconClass());
        })
          .map((Component, index) => <Component key={`${group}_${index}`} />)}
      </ul>
    </Group>);
  }
}

interface IContentProps {
  rootStore?: any;
}

export default Content;