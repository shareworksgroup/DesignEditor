import Guid from 'guid';
import { IRGBA } from '../schemas/common';

export const guid = (): string => Guid.create().value;

export const rgb2rgba = (rgb: string, alpha: number): string => {
	var r = parseInt("0x" + rgb.substr(1, 2));
	var g = parseInt("0x" + rgb.substr(3, 2));
	var b = parseInt("0x" + rgb.substr(5, 2));
	return "rgba(" + r + "," + g + "," + b + "," + alpha / 100 + ")";
};



export const rgba2rgb = (rgba: string): IRGBA => {
  if (!rgba) {
    return { rgb: '#fff', alpha: 100 };
  }
  if (rgba.substr(0, 1) === '#') {
    return {
      rgb: rgba,
      alpha: 100,
    }
  } else {
    const rgb = rgba.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?(?:,[\s+]?(.+)[\s+]?)?\)/i);
    return {
      rgb: "#" +
      ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
      ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
      ("0" + parseInt(rgb[3],10).toString(16)).slice(-2),
      alpha: parseFloat(rgb[4])*100 || 100,
    }
  }
}

export const dynamicList = [
  { key: 'wostatus', title: 'wostatus' },
  { key: 'wonum', title: 'wonum' },
  { key: 'author', title: 'author' },
  { key: 'date', title: 'date' },
];
