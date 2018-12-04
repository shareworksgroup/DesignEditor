

jest.mock('react-countup', () => {
  return function(props){
    return <span>{props.end}</span>
  }
});


import { shallow, mount, render } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import ReactTestUtils from 'react-dom/test-utils'; // ES6
import * as enzyme from 'enzyme';
import * as chai from 'chai';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });

import TinyCard from './index';

global.jestExpect = global.expect;
global.expect = chai.expect;

describe("TinyCard component test", () => {
  let onClick = null;
  const cardInfo = {
    title: 50,
    info: 'Unread Messages',
    infoClass: 'mdi-action-question-answer'
  };
  beforeEach(() => {
    onClick = jest.fn();
  });

  it("TinyCard event test", () => {
    const component = shallow(<TinyCard className="ripple"
    {...cardInfo} onClick={onClick}/>);
    component.find('.grid-item').simulate('click');
    jestExpect(onClick).toHaveBeenCalledTimes(1);
  });

  it("TinyCard snapshot test", () => {
    const component = renderer.create(<TinyCard className="ripple"
    {...cardInfo} onClick={onClick}/>).toJSON();
    jestExpect(component).toMatchSnapshot();
  });

});