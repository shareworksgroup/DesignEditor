
import { shallow, mount, render } from 'enzyme';
import React from 'react';
import * as enzyme from 'enzyme';
import * as chai from 'chai';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });

global.jestExpect = global.expect;
global.expect = chai.expect;
import Util from './util';

describe("Util test", () => {
  
  let outClick = null;

  beforeEach(() => {
    outClick = jest.fn();
  });

  it("Util isParent test", () => {
    const dom = mount(<div id="wrap"><span id="son">click me</span></div>, {attachTo: document.body});
    const wrap = document.querySelector('#wrap');
    const son = document.querySelector('#son');
    const isParent = Util.isParent(son, wrap);
    jestExpect(isParent).toBe(true);
  });

  it("Util cancel test", () => {
    const dom = mount(<div id="wrap"><span id="son">click me</span></div>, {attachTo: document.body});
    const wrap = document.querySelector('#wrap');
    const son = document.querySelector('#son');
    
     
    const handler = Util.outClick(wrap, outClick);
    const event = new Event("click");
    document.body.dispatchEvent(event);
    jestExpect(outClick).toHaveBeenCalledTimes(1);
    handler.cancel();
    document.body.dispatchEvent(event);
    jestExpect(outClick).toHaveBeenCalledTimes(1);

  });

  it("Util canceloutClick test", () => {
    const dom = mount(<div id="wrap"><span id="son">click me</span></div>, {attachTo: document.body});
    const wrap = document.querySelector('#wrap');
    const son = document.querySelector('#son');
    
    
    Util.outClick(wrap, outClick);
    const event2 = new Event("click");
    Object.defineProperty(event2, 'target', {value: son, enumerable: true});
    document.body.dispatchEvent(event2);
    const event = new Event("click");
    document.body.dispatchEvent(event);
    jestExpect(outClick).toHaveBeenCalledTimes(1);
    Util.canceloutClick(wrap);
    jestExpect(outClick).toHaveBeenCalledTimes(1);
  });
});