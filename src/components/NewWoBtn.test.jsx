
import { shallow, mount, render } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });

import NewWoBtn from './NewWoBtn';
describe("NewWoBtn component test", () => {

    it("click callback test", () => {
      const callback = jest.fn();
      const component = shallow(<NewWoBtn onClick={callback}/>);
      component.simulate('click');
      expect(callback).toHaveBeenCalledTimes(1);
      component.simulate('click');
      expect(callback).toHaveBeenCalledTimes(2);
    });
     
    it('snapshot test', () => {
      const callback = jest.fn();
      const component = renderer.create(<NewWoBtn onClick={callback}/>).toJSON();
      expect(component).toMatchSnapshot();
    });

  
});