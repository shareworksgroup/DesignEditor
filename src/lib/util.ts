import Guid from 'guid';

export const guid = (): string => Guid.create().value;

export const rgb2rgba = (rgb, alpha) => {
	var r = parseInt("0x" + rgb.substr(1, 2));
	var g = parseInt("0x" + rgb.substr(3, 2));
	var b = parseInt("0x" + rgb.substr(5, 2));
	return "rgba(" + r + "," + g + "," + b + "," + alpha / 100 + ")";
};

export const dynamicList = [
  { key: 'wostatus', title: 'wostatus' },
  { key: 'wonum', title: 'wonum' },
  { key: 'author', title: 'author' },
  { key: 'date', title: 'date' },
];
