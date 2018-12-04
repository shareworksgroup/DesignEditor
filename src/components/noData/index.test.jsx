
import React from 'react';
import renderer from 'react-test-renderer';

import NoData from './index';


describe("NoData component test", () => {
  it("NoData snapshot test", () => {
    const component = renderer.create(<NoData />).toJSON();
    expect(component).toMatchSnapshot();
  });

});