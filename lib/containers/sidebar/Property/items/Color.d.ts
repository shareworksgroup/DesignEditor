/// <reference types="react" />
import 'rc-color-picker/assets/index.css';
declare const Color: ({ title, value, attribute, onUpdate }: IColorProps) => JSX.Element;
interface IColorProps {
    title?: string;
    value?: string;
    attribute?: string;
    onUpdate?: onUpdate;
}
export default Color;
