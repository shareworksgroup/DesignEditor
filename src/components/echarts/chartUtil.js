import _ from 'lodash';

const ChartUtil = {
  formatNoGroupData: (data) => {
    const categories = [];
    const datas = [];
    _.each(data, (item) => {
      categories.push(item.name || item.key || '');
      temp_series = { value: item.value || 0, name: item.name };
      datas.push(temp_series);
    });
    return { category: categories, data: datas };
  },
  formatGroupData: (data, type) => {
    let groups = [];
    let names = [];
    const datas = [];
    const series = [];
    _.each(data, (item) => {
      item.group && groups.push(item.group);
      names.push(item.name || item.key);
      !item.group && datas.push(item.value);
    });
    if (groups.length === 0) {
      return { category: names, series: [{ type, data: datas }] };
    }
    groups = _.uniq(groups);
    names = _.uniq(names);
    _.each(groups, (group) => {
      const temp_series = {};
      const temp_data = [];
      _.each(data, (item) => {
        if (group === item.group) {
          temp_data.push(item.value);
        }
      });
      series.push({
        name: group,
        type,
        data: temp_data,
      });
    });
    return { category: names, series };
  },
  
  colorRgb: (color) => {
    let sColor = color.toLowerCase();
    // 十六进制颜色值的正则表达式
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    // 如果是16进制颜色
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        let sColorNew = '#';
        for (var i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
      }
      // 处理六位的颜色值
      const sColorChange = [];
      for (var i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt(`0x${sColor.slice(i, i + 2)}`));
      }
      return `RGB(${sColorChange.join(',')})`;
    }
    return sColor;
  },
  formatNum: (num, isFloat) => {
    if ((num < 0.01 && num > 0) || num === 0) {
      if (num === 0) {
        return '0';
      } else {
        return '<0.01';
      }
    }

    const rnum = isFloat ? num.toFixed(2) : parseInt(num, 10);

    let ret = rnum.toString().length <= 3 ? rnum : rnum.toString().split('').reverse().join('')
      .replace(/(\d{3})/g, '$1,')
      .split('')
      .reverse()
      .join('');
    if (typeof ret === 'string' && ret.indexOf(',') === 0) {
      ret = ret.substring(1);
    }
    return ret;
  },
};

export default ChartUtil;
