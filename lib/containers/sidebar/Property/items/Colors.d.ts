/// <reference types="react" />
import 'rc-color-picker/assets/index.css';
declare const Colors: ({ title, colors: { color, backgroundColor, hoverColor, hoverBackgroundColor }, onUpdate }: IColorsProps) => JSX.Element;
interface IColorsProps {
    title?: string;
    colors?: {
        color: string;
        backgroundColor: string;
        hoverColor: string;
        hoverBackgroundColor: string;
    };
    onUpdate?: onUpdate;
}
export default Colors;
