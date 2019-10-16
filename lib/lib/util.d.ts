import { IRGBA } from '../schemas/common';
import { ContentType } from './enum';
export declare const guid: () => string;
export declare const rgb2rgba: (rgb: string, alpha: number) => string;
export declare const rgba2rgb: (rgba: string) => IRGBA;
export declare const dynamicList: {
    key: string;
    title: string;
}[];
export declare const Config: {
    imageUploadUrl: string;
    mentions: {
        key: string;
        title: string;
    }[];
    contents: ContentType[];
    onUpload: (data: any) => any;
    onUploadError: () => void;
    enableUndoRedo: boolean;
    set: (key: string, value: any) => void;
    get: (key: string) => any;
};
export declare const generateIncressTimer: (minValue?: number, maxValue?: number, step?: number) => (duration: number, callback: Function) => {
    stop: () => void;
};
export declare const getRandomInt: (minValue: number, maxValue: number) => number;
export declare const extract: (regular: RegExp) => (text: string, index: number) => string;
export declare const type: (obj: any) => any;
export declare const getFileExtension: (text: string, index: number) => string;
export declare const checkFileExtension: (extensions: string | string[]) => (filename: string) => boolean;
export declare const imageTypes: Array<string>;
export declare const imgCheck: Function;
export declare const reOrder: (list: any, startIndex: any, endIndex: any) => {}[];
export declare const findIndex: (array: any, callback: any) => number;
export declare const defaultPosition: number;
export declare const getPositionByMiddleOffset: (dom: HTMLElement, mousePosition: {
    x: number;
    y: number;
}) => number;
