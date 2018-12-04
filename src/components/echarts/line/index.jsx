import React, { PureComponent } from 'react';
import _ from 'lodash';
import ReactEcharts from '../index';
import approx from 'approximate-number';
import ChartUtil from '../chartUtil';
import Color from '../color';


const seriesTemp = {
  data: [],
  type: 'line',
  symbol: 'circle',
  symbolSize: 8,
  hoverAnimation: false,
  itemStyle: {
    borderWidth: 0,
  },
  markPoint: {
    symbol: 'emptyCircle',
  }
};
export default class line extends PureComponent {
  getOption = () => {
    const { data, customText, legend, grid, needPercent, smooth = true, options } = this.props;
    if (options) {
      return options;
    }
    let yAxisPercentOption = {
      formatter: (val) => {
        return approx(val, { separator: ',', capital: true });
      },
    };
    if (needPercent) {
      seriesTemp.itemStyle.normal = {
        label: {
          show: true,
          formatter: '{b}\n{c}%',
        },
      };
      yAxisPercentOption = {
        show: true,
        interval: 'auto',
        formatter: '{value} %',
      };
    }
    const formatData = ChartUtil.formatGroupData(data, 'line');
    const xRotate = data.length > 3 ? { rotate: 40, interval: 0 } : {};
    const series = formatData.series.map((data, index) => {
      return _.extend({}, seriesTemp, data, {
        smooth,
        emphasis: {
          itemStyle: {
            borderWidth: 2,
            borderColor: Color[index]
          },
        },
      });
    });
    return {
      color: Color,
      grid: {
        left: '12%',
        right: '15%',
        top: '7%',
        bottom: '0',
        containLabel: true,
        ...grid,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: formatData.category,
        axisLabel: {
          fontSize: 12,
          color: '#000',
          fontFamily: 'Arial',
          ...xRotate,
        },
        axisTick: {
          show: true,
          lineStyle: {
            color: '#000',
          },
          alignWithLabel: true,
        },
        axisLine: {
          lineStyle: {
            color: '#4488BB',
            width: 2,
          },
        },
      },
      yAxis: {
        type: 'value',
        axisTick: {
          show: false,
        },
        axisLabel: {
          fontSize: 12,
          fontFamily: 'Arial',
          ...yAxisPercentOption,
        },
        axisLine: {
          lineStyle: {
            color: '#4488BB',
            width: 2,
          },
        },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line',
          lineStyle: {
            type: 'solid',
            color: '#4488BB',
            width: 2,
          },
        },
        formatter: (data) => {
          const title = data[0].name;
          const pre = `<span style="color:#fff;">${title}</span><br>
          <ul style="list-style:none;margin:0;padding:0;">`;
          return `${pre + data.reduce((a, b) =>
            `${a}
              <li>
                <span style="color:#fff"> ${(!!b.seriesName && b.seriesName.indexOf('series') === 0) ? customText : b.seriesName} : 
                  <i style="font-style:normal;">${ChartUtil.formatNum(b.value)}${needPercent ? '%' : ' '}</i>
                </span>
              </li>`, '')}</ul>`;
        },
        textStyle: {
          color: '#fff',
          fontSize: 14,
        },
      },
      series,
      legend,
    };
  }

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
