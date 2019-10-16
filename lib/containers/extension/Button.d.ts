/// <reference types="react" />
import Extension from './Extension';
import { ContentType } from '../../lib/enum';
declare class Button extends Extension<IButtonProps> {
    getIconClass(): string;
    getContentType(): ContentType;
    getLabel(): string;
    toHtml(data: any): string;
    getInitialAttribute(): IButtonProps;
    getProperties(values: any, update: any): JSX.Element;
    render(): JSX.Element;
}
interface IButtonProps {
    linkType?: string;
    text?: string;
    link?: string;
    color?: string;
    padding?: string;
    backgroundColor?: string;
    hoverColor?: string;
    hoverBackgroundColor?: string;
    textAlign?: TextAlgin;
    lineHeight?: number;
    borderRadius?: number;
    containerPadding?: string;
    lineStyle?: string;
    lineWidth?: number;
    lineColor?: string;
}
export default Button;
