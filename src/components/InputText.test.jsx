
import { shallow, mount, render } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });

import InputText from './InputText';
describe("InputText component test", () => {

  let choose = null;
  let queryChange = null;
  let clear = null;
  const data = [{
    Id: 1,
    Name: 'changsha',
    _selected: true,
  }, {
    Id: 2,
    Name: 'xiangtan',
  }, {
    Id: 3,
    Name: 'loudi',
  }];
  beforeEach(() => {
    choose = jest.fn();
    queryChange = jest.fn();
    clear = jest.fn();
  });

  it("show/hide dropdown list test", () => {
    const componentNode = renderer.create(<InputText data={data} choose={choose} clear={clear} queryChange={queryChange} />);
    let component = componentNode.toJSON();
    //  component.props.onMouseLeave();
    componentNode.root.children[0].props.onMouseLeave();
    expect(componentNode.root.instance.state.showList).toBe(false);
    component = componentNode.toJSON();
    expect(component).toMatchSnapshot();
    
    const input = componentNode.root.findByType('input');
    // const input = component.children[0].children[0];
    input.props.onMouseEnter();
    expect(componentNode.root.instance.state.showList).toBe(true);
    component = componentNode.toJSON();
    expect(component).toMatchSnapshot();
  });

  it("input querychange test", () => {
    const component = shallow(<InputText data={data} choose={choose} clear={clear} queryChange={queryChange} />);
    const event = {
      preventDefault() {},
      target: { value: 'search key' }
    };
    component.find('input').simulate('change', event);
    expect(queryChange).toBeCalledWith('search key');
  });

  it("dropdown list choose test", () => {
    const component = shallow(<InputText data={data} choose={choose} clear={clear} queryChange={queryChange} />);
    
    component.find('li').at(0).simulate('click');
    expect(choose).toBeCalledWith(data, data[0]);
  });

  it("input keydown test", () => {
    const component = shallow(<InputText data={data} choose={choose} clear={clear} queryChange={queryChange} />);
    const event = {
      preventDefault() {},
    };
    component.find('input').simulate('keydown', event);
    expect(clear.mock.calls.length).toBe(0);
    event.keyCode = 8;
    component.find('input').simulate('keydown', event);
    expect(clear.mock.calls.length).toBe(1);
  });

 
});