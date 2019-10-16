/// <reference types="react" />
import Extension from './Extension';
import { ContentType } from '../../lib/enum';
declare class Divider extends Extension<IDividerProps> {
    getIconClass(): string;
    getContentType(): ContentType;
    getLabel(): string;
    toHtml(data: any): string;
    getInitialAttribute(): IDividerProps;
    getProperties(values: any, update: any): JSX.Element;
    render(): JSX.Element;
}
interface IDividerProps {
    width: number;
    lineStyle: string;
    lineWidth: number;
    lineColor: string;
    textAlign: TextAlgin;
    containerPadding: string;
}
export default Divider;
