



import { shallow, mount, render } from 'enzyme';
import React from 'react';
import Moon from 'moon';
import renderer from 'react-test-renderer';
import ReactTestUtils from 'react-dom/test-utils'; // ES6
import * as enzyme from 'enzyme';
import * as chai from 'chai';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });

import Masonry from './index';

const fun = jest.fn();
global.jestExpect = global.expect;
global.expect = chai.expect;
global.$ = (dom) => {
  return {
    0: dom,
    masonry: () => {
      return {
        masonry:fun
      }
    }
  }
};
global.$.fn = {};
global.$.fn.masonry = () => {};

describe("Masonry component test", () => {
  

  it("Masonry event test", () => {
    const spyLayout = jest.spyOn(Masonry.prototype, 'layout');
    const component = mount(<Masonry>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      </Masonry>,{
        createNodeMock: () => { return {}; },
        attachTo: document.body
      });
    Moon.PubSub.notify('masonry_layout');
    jestExpect(fun.mock.calls.length).toBe(1);
    jestExpect(fun.mock.calls[0][0]).toBe('layout');
    jestExpect(spyLayout).toHaveBeenCalledTimes(1);
    component.setProps({});
    jestExpect(fun.mock.calls.length).toBe(3);
    jestExpect(fun.mock.calls[1][0]).toBe('reloadItems');
    jestExpect(fun.mock.calls[2][0]).toBe('layout');
    component.detach();
    jestExpect(fun.mock.calls.length).toBe(4);
    jestExpect(fun.mock.calls[3][0]).toBe('destroy');
    Moon.PubSub.notify('masonry_layout');
    jestExpect(spyLayout).toHaveBeenCalledTimes(1);
  });


  it("Masonry snapshot test", () => {
    const component = renderer.create(<Masonry>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      </Masonry>,{createNodeMock: () => { return { }; }}).toJSON();
    jestExpect(component).toMatchSnapshot();
  });
  
});