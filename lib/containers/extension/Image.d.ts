/// <reference types="react" />
import Extension from './Extension';
import { ContentType } from '../../lib/enum';
declare class Image extends Extension<IImageProps> {
    getIconClass(): string;
    getContentType(): ContentType;
    getLabel(): string;
    toHtml(data: any): string;
    getInitialAttribute(): IImageProps;
    getProperties(values: any, update: any): JSX.Element;
    render(): JSX.Element;
}
interface IImageProps {
    link: string;
    linkType: string;
    containerPadding: string;
    textAlign: TextAlgin;
    fullWidth: false;
    alter: string;
    url: string;
    width: number;
    height: number;
}
export default Image;
