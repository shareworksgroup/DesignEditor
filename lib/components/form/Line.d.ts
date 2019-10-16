/// <reference types="react" />
import 'rc-color-picker/assets/index.css';
import './index.less';
declare const _default: ({ lineWidth, lineStyle, lineColor, onUpdate }: ILineProps) => JSX.Element;
export default _default;
interface ILineProps {
    lineWidth?: number;
    lineStyle?: string;
    lineColor?: string;
    onUpdate?: onUpdate;
}
