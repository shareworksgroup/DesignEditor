/// <reference types="react" />
declare const InputItem: ({ title, value, attribute, desc, onUpdate }: IInputItemProps) => JSX.Element;
interface IInputItemProps {
    title?: string;
    value?: string;
    attribute?: string;
    desc?: string;
    onUpdate?: onUpdate;
}
export default InputItem;
