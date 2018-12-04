import React, { PureComponent } from 'react';
import ReactEcharts from '../index';
import Color from '../color';

const ROWLEGENDNUM = 10;
export default class pie extends PureComponent {
  getOption = () => {
    const { data, showLegend = false, alignLeft = false, legend = null, series = {}, tooltip = null, hoverAnimation = false, options } = this.props;
    if (options) {
      return options;
    }
    // name ,value 形式
    if (data) {
      return {
        grid: {
          left: '1%',
        },
        legend: legend ? legend : showLegend ? {
          orient: 'vertical',
          left: '50%',
          top: 'middle',
          data: data.map((i) => {
            return {
              name: i.name,
              icon: 'circle',
            };
          }),
          formatter: (name) => {
            const re = data.filter((item) => {
              if (item.name === name) {
                return item;
              }
            });
            if (re[0] && re[0].value) {
              return ` ${name}        ${parseFloat(re[0].value).toFixed(2)}%`;
            }
          },
        } : null,
        color: Color,
        series: [{
          name: 'Pie',
          type: 'pie',
          center: [( alignLeft && (legend && legend.data.length > ROWLEGENDNUM) || (showLegend && data.length > ROWLEGENDNUM) ) ? '25%' : '50%', '50%'],
          data: data, 
          hoverAnimation: hoverAnimation,
          ...series,
        }],
        tooltip : tooltip || {
          trigger: 'item',
          formatter: "{b} : {c} ({d}%)"
        },
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
            />
          ) : null
    );
  }
}
