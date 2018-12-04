import React, { PureComponent } from 'react';
import ReactEcharts from '../index';

export default class gauge extends PureComponent {
  getOption = () => {
    const { data = 0, maxValue, color, splitNumber, formatter, options } = this.props;
    if (options) {
      return options;
    }
    // name ,value 形式
    if (typeof data !== 'undefined') {
      return {
        series:[{
          min: 0,
          max: maxValue || 5,
          name: 'Performance Overview',
          type: 'gauge',
          radius: '85%',
          center: ['50%', '52%'],
          axisLine: {
            lineStyle: {
              color: color || [
                [0.6, '#fc605b'],
                [0.9, '#55B0F2'],
                [1, '#33c748']
              ],
              width: 3
            }
          },
          axisTick: {
            length: 12,
            lineStyle: {
                color: 'auto',
                width: 1,
            },
            splitNumber: splitNumber || 5,
          },
          pointer:{
            width: 5,
          },
          splitLine: {
              length: 24,
              lineStyle:{
                  color: 'auto',
                  width: 2,
              }
          },
          detail: {
            formatter: formatter || '{value}',
            textStyle: {
              fontFamily: 'Roboto, Arial, Verdana, sans-serif',
              fontSize: 30
            },
            offsetCenter: [0, '60%']
          },
          data: [{
            value: data
          }],
          animation: true,
        }],
      };
    } else {
      return {};
    }
  };

  render() {
    const { height = 250, data, onEvents, options } = this.props;
    const option = this.getOption();
    return (
          (data !== 'undefined' || options) ? (
            <ReactEcharts
              option={option}
              style={{ height: '100%', width: '100%' }}
              className="react_for_echarts"
              onEvents={onEvents}
            />
          ) : null
    );
  }
}
