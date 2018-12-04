
import { shallow, mount, render } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });

import Operations from './Operations';
describe("Operations component test", () => {
    let onAdvance = null;
    let onSearch = null;
    beforeEach(() => {
      onAdvance = jest.fn();
      onSearch = jest.fn();
    });

    it("click callback test", () => {
      const callback = jest.fn();
      const component = shallow(<Operations onSearch={onSearch} onAdvance={onAdvance} />);
      component.find('button').at(0).simulate('click');
      expect(onSearch.mock.calls.length).toBe(1);
      component.find('button').at(1).simulate('click');
      expect(onAdvance.mock.calls.length).toBe(1);
    });
     
    it('snapshot test', () => {
      const component = renderer.create(<Operations onSearch={onSearch} onAdvance={onAdvance} />).toJSON();
      expect(component).toMatchSnapshot();
    });
});