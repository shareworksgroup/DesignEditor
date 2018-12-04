
import React from 'react';
import renderer from 'react-test-renderer';

import Spin from './index';


describe("Spin component test", () => {
  it("Spin snapshot test", () => {
    const component = renderer.create(<Spin style={{ margin: `${20}px auto` }} />).toJSON();
    expect(component).toMatchSnapshot();
  });

});