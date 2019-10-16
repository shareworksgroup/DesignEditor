/// <reference types="react" />
import { Extension } from './entry';
declare class Video extends Extension<IVideoProps> {
    getIconClass(): string;
    getContentType(): string;
    getLabel(): string;
    toHtml(data: any): string;
    getInitialAttribute(): IVideoProps;
    getProperties(values: IVideoProps, update: any): JSX.Element;
    render(): JSX.Element;
}
interface IVideoProps {
    url?: string;
    containerPadding?: string;
    textAlign?: TextAlgin;
    fullWidth?: boolean;
}
export default Video;
