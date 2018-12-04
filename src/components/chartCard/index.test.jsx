
import { shallow, mount, render } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import ReactTestUtils from 'react-dom/test-utils'; // ES6
import * as enzyme from 'enzyme';
import * as chai from 'chai';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });

import ChartCard from './index';

global.jestExpect = global.expect;
global.expect = chai.expect;

describe("ChartCard component test", () => {
  let onRefresh = null;
  let onFullScreen = null;
  let onDelete = null;
  const content = <span className="contentmsg">
    I am ChartCard Content
    </span>;
  beforeEach(() => {
    onRefresh = jest.fn();
    onFullScreen = jest.fn();
    onDelete = jest.fn();
  });

  it("chartcard event test", () => {
    const spyonFullScreen = jest.spyOn(ChartCard.prototype, 'onFullScreen');
    const component = shallow(<ChartCard title="Financial Overview MTD" iconClass="mdi-device-wifi-tethering"
      onRefresh={onRefresh} onFullScreen={onFullScreen} onDelete={onDelete} showDelete={true}
    >{content}
    </ChartCard>);
    component.find('.dropdown-toggle').simulate('click');
    expect(component.state().showMenu).to.equal(true);

    // 测试删除按钮 非全屏模式下
    component.find('#deleteBtn').simulate('click');
    expect(component.state().delete).to.equal(true);
    jestExpect(onDelete).toHaveBeenCalledTimes(1);

    // 测试全屏
    component.find('#fullScreen').simulate('click');
    jestExpect(spyonFullScreen).toHaveBeenCalled();
    expect(component.state().fullScreen).to.equal(true);
    jestExpect(onFullScreen).toHaveBeenCalledTimes(1);

    component.find('.dropdown-toggle').simulate('click');
    expect(component.state().showMenu).to.equal(true);
    component.find('.dropdown-menu').simulate('click');
    expect(component.state().showMenu).to.equal(false);
  });

  it('chartcard document click test', () => {
    const component = mount(<ChartCard title="Financial Overview MTD" iconClass="mdi-device-wifi-tethering"
        onRefresh={onRefresh} onFullScreen={onFullScreen} onDelete={onDelete} showDelete={true}
      >{content}
    </ChartCard>, { attachTo: document.body });
    component.find('.dropdown-toggle').simulate('click');
    expect(component.state().showMenu).to.equal(true);
    const event = new Event("click");
    document.body.dispatchEvent(event);
    expect(component.state().showMenu).to.equal(false);
    component.detach();
  });

  it("chartcard content test", () => {
    const component = shallow(<ChartCard title="Financial Overview MTD" iconClass="mdi-device-wifi-tethering"
      onRefresh={onRefresh} onFullScreen={onFullScreen} onDelete={onDelete}
    >{content}
    </ChartCard>);
    expect(component.find('.contentmsg')).to.have.length(1);
    expect(component.contains(content)).to.equal(true);
  });

  it('snapshot test', () => {
    const component = renderer.create(<ChartCard title="Financial Overview MTD" iconClass="mdi-device-wifi-tethering"
      onRefresh={onRefresh} onFullScreen={onFullScreen} onDelete={onDelete}
    >{content}
    </ChartCard>).toJSON();
    jestExpect(component).toMatchSnapshot();
  });


});