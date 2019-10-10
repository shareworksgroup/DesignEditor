import Guid from 'guid';
import { IRGBA } from '../schemas/common';
import { Types, ContentType, Position } from './enum';

export const guid = (): string => Guid.create().value;

export const rgb2rgba = (rgb: string, alpha: number): string => {
  const r = parseInt(`0x${rgb.substr(1, 2)}`, 10);
  const g = parseInt(`0x${rgb.substr(3, 2)}`, 10);
  const b = parseInt(`0x${rgb.substr(5, 2)}`, 10);
  return `rgba(${r},${g},${b},${alpha / 100})`;
};

export const rgba2rgb = (rgba: string): IRGBA => {
  if (!rgba) {
    return { rgb: '#fff', alpha: 100 };
  }
  if (rgba.substr(0, 1) === '#') {
    return {
      rgb: rgba,
      alpha: 100,
    };
  }
  /* eslint-disable */
  const rgb = rgba.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?(?:,[\s+]?(.+)[\s+]?)?\)/i);
  return {
    rgb: "#" +
    ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2),
    alpha: parseFloat(rgb[4]) * 100 || 100,
  };
  /* eslint-enable */
};

export const dynamicList = [
  { key: 'keyword one', title: 'keyword one' },
  { key: 'keyword two', title: 'keyword two' },
  { key: 'keyword three', title: 'keyword three' },
  { key: 'keyword four', title: 'keyword four' }
];

export const Config = {
  imageUploadUrl: 'http://localhost:3001/NewUserFeedback/upload',
  mentions: dynamicList,
  contents: [ContentType.BUTTON, ContentType.DIVIDER, ContentType.HTML, ContentType.IMAGE, ContentType.SOCIAL, ContentType.TEXT],
  onUpload: data => data.fileUrl,
  onUploadError: () => { },
  set: (key: string, value: any) => {
    Config[key] = value;
  },
  get: (key: string) => {
    return Config[key];
  }
};

export const generateIncressTimer = (minValue: number = 0, maxValue: number = 100, step: number = 1000) =>
  (duration: number = 5, callback: Function) => {
    let stop = false;
    let residue = duration * 1000;
    let value = getRandomInt(minValue, (maxValue - minValue) / 4);
    callback && callback(value);
    const caculate = () => {
      if (stop) {
        return;
      }
      value = getRandomInt(value, maxValue);
      callback && callback(value);
      residue -= step;
      !stop && residue > 0 && setTimeout(caculate, step);
    };
    !stop && setTimeout(caculate, step);
    return {
      stop: () => {
        stop = true;
      }
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

export const type = obj => {
  const type = Object.prototype.toString.call(obj);
  return type.substring(8, type.length - 1);
};

export const getFileExtension = extract(/(\.(\w+)\?)|(\.(\w+)$)/);

export const checkFileExtension = (extensions: string | Array<string>) =>
  (filename: string) =>
    (<Array<string>>(type(extensions) === Types.Array ? extensions : [extensions]))
      .some((i: string) => i.toUpperCase() === getFileExtension(filename, 0).toUpperCase());

export const imageTypes: Array<string> = ['.jpg', '.bmp', '.gif', '.jpeg', '.png'];

export const imgCheck: Function = checkFileExtension(imageTypes);

export const reOrder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export const findIndex = (array, callback) => {
  let index = -1;
  array.some((item, i) => {
    if (callback(item)) {
      index = i;
      return true;
    }
    return false;
  });
  return index;
};
(window as any).findIndex = findIndex;

export const defaultPosition = Position.BEFORE;

export const getPositionByMiddleOffset = (dom: HTMLElement, mousePosition: { x: number, y: number }) => {
  const hoverBoundingRect = dom.getBoundingClientRect();
  const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
  const clientOffset = mousePosition;
  const hoverClientY = clientOffset.y - hoverBoundingRect.top;

  let position = defaultPosition;
  if (hoverClientY > hoverMiddleY) {
    position = Position.AFTER;
  }
  return position;
};