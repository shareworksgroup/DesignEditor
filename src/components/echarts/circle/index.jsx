import React, { PureComponent } from 'react';
import ReactEcharts from '../index';
import Color from '../color';

export default class circle extends PureComponent {
  getOption = () => {
    const { data, showLegend = false, hoverAnimation = false, color = Color[0], options } = this.props;
    if (options) {
      return options;
    }
    const legendData = [];
    // name ,value 形式
    if (data) {
      return {
        series: [{
          type: 'pie',
          center: ['50%', '50%'],
          radius: ['50%', '65%'],
          data,
          itemStyle: {
            normal: {
              color,
              label: {
                  show: true,
                  position: 'center',
                  formatter: '{c}',
                  textStyle: {
                      fontSize: '50',
                      baseline: 'middle',
                      color: '#000000',
                  }
              },
              labelLine: {
                  show: false
              }
            }
          },
          hoverAnimation: hoverAnimation,
        }],
      };
    } else {
      return {};
    }
  };

  render() {
    const { height = 250, data, onEvents, options, theme } = this.props;
    const option = this.getOption();
    return (
          (data && (data.length > 0) || options) ? (
            <ReactEcharts
              option={option}
              style={{ height: '100%', width: '100%' }}
              className="react_for_echarts"
              onEvents={onEvents}
              theme={theme}
            />) : null
    );
  }
}
