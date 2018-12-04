



import { shallow, mount, render } from 'enzyme';
import React from 'react';
import moment from 'moment';
import renderer from 'react-test-renderer';
import * as enzyme from 'enzyme';
import * as chai from 'chai';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });

import Event from './index';

global.jestExpect = global.expect;
global.expect = chai.expect;


describe("Event component test", () => {
  const events = [
    {
      "title": "Not cooling",
      "start": "2018-06-05T07:34:00",
      "constraint": "Alice Pinkney",
      "color": "#E6C800"
    },
    {
      "className": "escalate",
      "title": "Making noise",
      "start": "2018-06-07T14:30:00",
      "constraint": "Dan Smith",
      "color": "#FF2968"
    },
    {
      "title": "Making noise",
      "start": "2018-06-12T13:00:00",
      "constraint": "Nick Martin",
      "color": "#711A76"
    },
    {
      "title": "Making noise",
      "className": "escalate",
      "start": "2018-06-20T09:40:00",
      "constraint": "Tom Ryan",
      "color": "#00AEFF"
    },
    {
      "title": "Making noise",
      "className": "escalate",
      "start": "2018-06-22T09:40:00",
      "constraint": "Lis klisser",
      "color": "#882F00"
    },
    {
      "title": "Making noise",
      "start": "2018-06-23T09:40:00",
      "className": "event-block",
      "constraint": "Dan Smith",
      "color": "#44A703"
    }
  ];



  it("Calendar snapshot test", () => {
    const component = renderer.create(<Event>
      {
        events.map(item => <Event.Item time={moment(item.start).format('MM/DD/YY h:mm a')} info={item.title} />)
      }
    </Event>).toJSON();
    jestExpect(component).toMatchSnapshot();
  });
  
});