/// <reference types="react" />
import Extension from './Extension';
import { ContentType } from '../../lib/enum';
declare class Html extends Extension<IHtmlProps> {
    getIconClass(): string;
    getContentType(): ContentType;
    getLabel(): string;
    toHtml(data: any): string;
    getInitialAttribute(): {
        html: string;
        containerPadding: string;
    };
    getProperties(values: any, update: any): JSX.Element;
    render(): JSX.Element;
}
interface IHtmlProps {
    html: string;
    containerPadding: string;
}
export default Html;
