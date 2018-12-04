import React, { PureComponent } from 'react';
import ReactEcharts from '../index';
import approx from 'approximate-number';
import ChartUtil from '../chartUtil';
import Color from '../color';

const seriesTemp = {
  data: [],
  type: 'bar',
  barGap: 0,
  itemStyle: {
    color: Color[0],
  },
};
export default class bar extends PureComponent {
  getOption = () => {
    const { data, customText, diffColor = false, legend, grid, needPercent, options } = this.props;
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
    const formatData = ChartUtil.formatGroupData(data, 'bar');
    const xRotate = data.length > 3 ? { rotate: 40, interval: 0 } : {};
    const series = formatData.series.map((rdata) => {
      return _.extend({}, seriesTemp, rdata, {
        itemStyle: {
          color: diffColor && (params => Color[params.dataIndex]),
        },
      });
    });
    return {
      color: Color,
      grid: {
        left: '12%',
        right: '15%',
        top: '20%',
        bottom: '0',
        containLabel: true,
        ...grid,
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
          const pre = `<span style="color:#fff">${title}</span><br>
          <ul style="list-style:none;margin:0;padding:0;">`;
          return `${pre + data.reduce((a, b) =>
            `${a}
              <li>
                <span style="color:#fff"> ${(!!b.seriesName && b.seriesName.indexOf('series') === 0) ? customText : b.seriesName} :
                  <i style="font-style:normal;">${(parseInt(b.value)).toFixed(2)}${needPercent ? '%' : ''}</i>
                </span>
              </li>`, '')}</ul>`;
        },
        textStyle: {
          color: '#fff',
          fontSize: 14,
        },
      },
      xAxis: {
        type: 'category',
        axisTick: {
          show: true,
          lineStyle: {
            color: '#000',
          },
          alignWithLabel: true,
        },
        data: formatData.category,
        axisLabel: {
          fontSize: 12,
          color: '#000',
          fontFamily: 'Arial',
          // rotate: 45,
          margin: 12,
          ...xRotate,
        },
        axisLine: {
          lineStyle: {
            color: '#4488BB',
            width: 2,
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#CCCCCC',
          },
        },
      },
      yAxis: [{
        type: 'value',
        axisLine: {
          show: true,
          lineStyle: {
            color: '#4488BB',
            width: 2,
          },
        },
        axisLabel: {
          fontSize: 12,
          fontFamily: 'Arial',
          margin: 12,
          color:'#000',
          ...yAxisPercentOption,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#CCCCCC',
          },
        },
        axisTick: {
          show: false,
        },
      }],
      series,
      legend,
    };
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
