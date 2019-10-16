/// <reference types="react" />
import './html/prism.css';
declare const _default: ({ value, onChange, style }: IHtmlProps) => JSX.Element;
export default _default;
interface IHtmlProps {
    value?: string;
    onChange?: (value: string) => void;
    style?: IKeyValueMap;
}
