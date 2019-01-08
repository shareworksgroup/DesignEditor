import React from 'react';
import Extension from './Extension';
import { ContentType } from '../../lib/enum';
import Group from '../sidebar/Property/Group';

class Button extends Extension {
  getIconClass() {
    return 'mdi-image-crop-7-5';
  }

  getContentType() {
    return ContentType.BUTTON;
  }

  getLabel() {
    return 'Button';
  }

  getInitialAttribute(){
    return {
      linktype: '_self',
      text:'ss',
      link: 'http://www.baidu.com'
    };
  }

  getProperties(values, update) {
    console.log(values)
    return <React.Fragment>
      <Group title="LINK">
        <div className="blockbuilder-widget blockbuilder-link-widget">
          <div className="row">
            <div className="blockbuilder-widget-label col-6">
              <label className="blockbuilder-label-primary"><span>Button Link</span></label>
            </div>
            <div className="col-6">
              <select className="form-control form-control-sm" value={values.linktype} onChange={(e)=>{update('linktype', e.target.value)}}>
                <option value="_self">Same Tab</option>
                <option value="_blank">New Tab</option>
              </select>
            </div>
          </div>
          <div className="row pt-1">
            <div className="col-12">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">URL</span>
                </div>
                <input type="text" value={values.link} className="form-control" onChange={(e)=>{update('link', e.target.value)}} />
              </div>
            </div>
          </div>
          <input type="text" value={values.text} className="form-control" onChange={(e)=>{update('text', e.target.value)}} />

        </div>
      </Group>
    </React.Fragment>
  }

  render() {
    const { text } = this.props;
    return <div className="ds_content_button">
      <div style={{
        textAlign: 'center'
      }}>
        <a className="editable" >
          {text || "Button Text"}
        </a>
      </div>
    </div>;
  }
}

export default Button;