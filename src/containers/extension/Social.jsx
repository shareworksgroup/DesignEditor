import React from 'react';
import Extension from './Extension';
import { ContentType } from '../../lib/enum';
import { guid } from '../../lib/util';
import Group from '../sidebar/Property/Group';
import { Align, Slide, Space, NumberItem, SocialItem } from '../sidebar/Property/items';

class Social extends Extension {
  getIconClass() {
    return 'icon icon-facebook';
  }

  getContentType() {
    return ContentType.SOCIAL;
  }

  getLabel() {
    return 'Social';
  }

  toHtml(data) {
    const { items, width, height, textAlign, containerPadding, margin } = data;
    return `<div>
      <div style="padding:${containerPadding};text-align:${textAlign}">
        ${items.map(item => `<a key='${item.guid}' href='${item.url}' style='margin:${margin};'><img style='height:${height}px;width:${width}px;' src='${item.icon}'></img></a>`).join('')}
      </div>
    </div>`;
  }

  getInitialAttribute() {
    return {
      items: [
        {
          guid: guid(),
          icon: 'http://smsonedev.marketplacesupport.com:81/demo/IceMountain/Sources/images/generic-icon1.png',
          url: 'https://www.facebook.com/InvitationHomesWeb'
        },
        {
          guid: guid(),
          icon: 'http://smsonedev.marketplacesupport.com:81/demo/IceMountain/Sources/images/generic-icon2.png',
          url: 'https://www.youtube.com/user/InvitationHomes'
        },
        {
          guid: guid(),
          icon: 'http://smsonedev.marketplacesupport.com:81/demo/IceMountain/Sources/images/generic-icon3.png',
          url: 'http://visitor.r20.constantcontact.com/manage/optin?v=001N4nuM40E6xHVcQ2fafr_r9hmuhX6yBC-0uSICWSKzNXEfuQsVKDg4MLSWoiboKI097kcU8OBWryVeTx_2sle1F1n6-bsYZKO1A1FLpjjrY4%3D'
        },
        {
          guid: guid(),
          icon: 'http://smsonedev.marketplacesupport.com:81/demo/IceMountain/Sources/images/generic-icon4.png',
          url: 'https://plus.google.com/+Invitationhomes/posts'
        },
        {
          guid: guid(),
          icon: 'http://smsonedev.marketplacesupport.com:81/demo/IceMountain/Sources/images/generic-icon5.png',
          url: 'https://twitter.com/InvitationHomes'
        }
      ],
      textAlign: 'center',
      containerPadding: '10px',
      margin: '5px',
      width: 35,
      height: 35,
    };
  }

  getProperties(values, update) {
    const { items, width, height, textAlign, containerPadding, margin } = values;
    return <React.Fragment>
      <Group title="ICONS">
        <SocialItem items={items} onUpdate={update} />
      </Group>
      <Group title="GENERAL">
        <Align align={textAlign} onUpdate={update} />
        <NumberItem title="Width" attribute="width" value={width} onUpdate={update} step={1} max={100} min={5} />
        <NumberItem title="Height" attribute="height" value={height} onUpdate={update} step={1} max={100} min={5} />
        <Space title="Margin" value={margin} attribute="margin" onUpdate={update} />
        <Space title="Container Padding" value={containerPadding} attribute="containerPadding" onUpdate={update} />
      </Group>
    </React.Fragment>
  }

  render() {
    const { items, width, height, textAlign, containerPadding, margin } = this.props;
    return <div className="ds_content_social">
      <div className="ds_content_social_container" style={{
        padding: containerPadding,
        textAlign,
      }}>
        {items.map(item => <a key={item.guid} href={item.url} style={{
          margin,
        }}><img style={{
          width,
          height,
        }} src={item.icon}></img></a>)}
      </div>
    </div>
  }
}

export default Social;