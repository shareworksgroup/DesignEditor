import Guid from 'guid';
import { IRGBA } from '../schemas/common';
import { Types } from './enum';

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

export const Config = {
  imageUploadUrl: 'http://192.168.23.120:3001/NewUserFeedback/upload',
  onUpload: data => data.fileUrl,
  onUploadError: () => {},
  set: (key, value) => {
    Config[key] = value;
  },
  get: (key) => {
    return Config[key];
  }
};

export const generateIncressTimer = (minValue:number = 0, maxValue:number = 100) =>
  (duration:number = 5, callback: Function) => {
    let stop = false;
    const step = 1000;
    let lastTime = duration * 1000;
    let value = getRandomInt(minValue, (maxValue - minValue) /2 );
    callback && callback(value);
    const caculate = () => {
      if (stop) {
        return;
      }
      value = getRandomInt(value, maxValue);
      callback && callback(value);
      lastTime = lastTime - step;
      !stop && lastTime > 0 && setTimeout(caculate, 1000);
    };
    !stop && setTimeout(caculate, 1000);
    return {
      stop: () => {
        stop = true }
    };
};

export const getRandomInt = (minValue: number, maxValue: number) => {
  const min = Math.ceil(minValue);
  const max = Math.floor(maxValue);
  return Math.floor(Math.random() * (max - min)) + min;
};

export const extract = (regular: RegExp) => (text: string, index: number) => {
  try {
      return text ? text.match(regular)[index] : '';
  } catch (e) {
      console.log(e.message);
      return '';
  }
};

export const type = (obj) => {
  const type = Object.prototype.toString.call(obj);
  return type.substring(8, type.length - 1);
};

export const getFileExtension = extract(/(\.(\w+)\?)|(\.(\w+)$)/);

export const checkFileExtension = (extensions: string | Array<string>) =>
    (filename: string) =>
        (<Array<string>>(type(extensions) === Types.Array ? extensions : [extensions])).some((i:string) => i.toUpperCase() === getFileExtension(filename, 0).toUpperCase());
    
export const imageTypes: Array<string> = ['.jpg', '.bmp', '.gif', '.jpeg', '.png'];

export const imgCheck: Function = checkFileExtension(imageTypes);