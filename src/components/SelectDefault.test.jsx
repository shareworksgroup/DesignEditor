
import { shallow, mount, render } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });

import SelectDefault from './SelectDefault';
describe("SelectDefault component test", () => {
    let choose = null;
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
    });

    it("choose callback test", () => {
      const props = {
        placeholder: "Filter by Responsible Vendor",
        data,
        choose,
      };
      const component = shallow(<SelectDefault {...props} />);
      component.find('Select').simulate('change', {
        preventDefault() {},
        target: { value: 3 }
      });
      expect(choose).toBeCalledWith(data, data[2]);
      component.find('Select').simulate('change', 3);
      expect(choose).toBeCalledWith(data, data[2]);
      component.find('Select').simulate('change', null);
      expect(choose).toBeCalledWith(data, {});
    });
     
    it('snapshot test', () => {
      const props = {
        placeholder: "Filter by Responsible Vendor",
        data,
        choose,
      };
      const component = renderer.create(<SelectDefault {...props} />).toJSON();
      expect(component).toMatchSnapshot();
    });
});