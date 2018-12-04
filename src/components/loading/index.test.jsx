
import { shallow, mount, render } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

import Loading from './index';


describe("Loading component test", () => {
  
  it('snapshot test', () => {
    const component = renderer.create(<Loading show />).toJSON();
    expect(component).toMatchSnapshot();
  });


});