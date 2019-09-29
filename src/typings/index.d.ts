declare module 'rc-color-picker/assets/index.css';
declare module 'tinymce';

interface IKeyValueMap<T = any> {
  [key: string]: T;
}

type TextAlgin = 'left' | 'right' | 'center';

type onUpdate = (key: string, value: any) => void;

interface ISocialItem {
  guid: string;
  icon: string;
  url: string;
}

interface IError {
  stack?: string;
}

interface IPosition {
  x: number;
  y: number;
}

interface IItem {
  key: string;
  title: string;
}