/// <reference types="react" />
import Extension from './Extension';
import { ContentType } from '../../lib/enum';
declare class Social extends Extension<ISocialProps> {
    getIconClass(): string;
    getContentType(): ContentType;
    getLabel(): string;
    toHtml(data: any): string;
    getInitialAttribute(): ISocialProps;
    getProperties(values: any, update: any): JSX.Element;
    render(): JSX.Element;
}
interface ISocialProps {
    items: ISocialItem[];
    textAlign: TextAlgin;
    containerPadding: string;
    margin: string;
    width: number;
    height: number;
}
export default Social;
