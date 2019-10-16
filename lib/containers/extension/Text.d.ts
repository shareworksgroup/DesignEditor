/// <reference types="react" />
import Extension from './Extension';
import { ContentType } from '../../lib/enum';
declare class Text extends Extension<ITextProps> {
    getIconClass(): string;
    getContentType(): ContentType;
    getLabel(): string;
    toHtml(data: any): string;
    getInitialAttribute(): ITextProps;
    getProperties(values: any, update: any): JSX.Element;
    render(): JSX.Element;
}
interface ITextProps {
    color: string;
    text: string;
    textAlign: TextAlgin;
    lineHeight: number;
    padding: string;
    containerPadding: string;
}
export default Text;
