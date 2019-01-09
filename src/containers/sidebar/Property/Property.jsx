import React from 'react';
import Animate from 'rc-animate';
import { inject, observer } from 'mobx-react';
import classnames from 'classnames';
import { DesignType } from '../../../lib/enum';
import { LazyRenderBox } from '../../../components';
import Group from './Group';
import RowProperty from './RowProperty';

class Property extends React.Component {

  onClose = () => {
    
    const { rootStore: { DesignState }} = this.props;
    DesignState.setSelected(null);
  }

  onUpdate = (key, value) => {
    const { propertyId, rootStore: { DesignState }} = this.props;
    DesignState.updateAttribute(propertyId, key, value);
  }

  render(){
    const { propertyId, onClose = () => {}, rootStore: { DesignState }} = this.props;
    const data = DesignState.getDataByGuid(propertyId);
    if (!data) {
      return;
    }
    const meta = data.values._meta;
    let title = 'Row';
    let extension = null;
    if (meta.type === DesignType.CONTENT) {
      title = 'Content';
      extension = DesignState.getExtension(meta.subtype);
    }
    console.log('property');
    return <div className="blockbuilder-options-panel">
    <div className="blockbuilder-options-header">
      <div className="row">
        <div className="col-7 blockbuilder-options-title">
          <span>{title}</span>
        </div>
        <div className="col-5 text-right">
          <div className="options-item" data-tooltipped="" aria-describedby="tippy-tooltip-149" data-original-title="Delete" ><a className="icon-delete icon"><svg aria-hidden="true" data-prefix="fas" data-icon="trash-alt" className="svg-inline--fa fa-trash-alt fa-w-14 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M0 84V56c0-13.3 10.7-24 24-24h112l9.4-18.7c4-8.2 12.3-13.3 21.4-13.3h114.3c9.1 0 17.4 5.1 21.5 13.3L312 32h112c13.3 0 24 10.7 24 24v28c0 6.6-5.4 12-12 12H12C5.4 96 0 90.6 0 84zm416 56v324c0 26.5-21.5 48-48 48H80c-26.5 0-48-21.5-48-48V140c0-6.6 5.4-12 12-12h360c6.6 0 12 5.4 12 12zm-272 68c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208zm96 0c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208zm96 0c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208z"></path></svg></a></div>
          <div className="options-item" data-tooltipped="" aria-describedby="tippy-tooltip-150" data-original-title="Duplicate"><a className="icon-duplicate icon"><svg aria-hidden="true" data-prefix="fas" data-icon="clone" className="svg-inline--fa fa-clone fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M464 0c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48H176c-26.51 0-48-21.49-48-48V48c0-26.51 21.49-48 48-48h288M176 416c-44.112 0-80-35.888-80-80V128H48c-26.51 0-48 21.49-48 48v288c0 26.51 21.49 48 48 48h288c26.51 0 48-21.49 48-48v-48H176z"></path></svg></a></div>
          <a onClick={this.onClose} className="icon-close icon"><svg aria-hidden="true" data-prefix="fas" data-icon="chevron-down" className="svg-inline--fa fa-chevron-down fa-w-14 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path></svg></a>
        </div>
      </div>
    </div>
    <div className="blockbuilder-options-content">
      { extension ? new extension().getProperties(data.values, this.onUpdate) : <RowProperty {...data.values} onUpdate={this.onUpdate} />}
    </div>
  </div>;
  }
}
Property = inject('rootStore')(observer(Property));
class PropertyWrap extends React.Component {
  render (){
    const { className, visible = false, destroyOnClose = false, style = {} } = this.props;
    const boxElement = <LazyRenderBox
        key="property"
        className={classnames('property-panel', className)}
        hiddenClassName='hide'
        visible={visible}
        style={style}
      >
      <Property {...this.props} />
    </LazyRenderBox>;
    return  <Animate
      key="property"
      showProp="visible"
      transitionAppear
      component=""
      transitionName={`bottom`}
    >
        {(!!visible || !destroyOnClose) ? boxElement : null}
    </Animate>;
  }
}

export default inject('rootStore')(observer(PropertyWrap));