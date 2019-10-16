/// <reference types="react" />
declare const NumberItem: ({ title, value, step, max, min, attribute, onUpdate }: INumberItemProps) => JSX.Element;
interface INumberItemProps {
    title?: string;
    value?: number;
    step?: number;
    max?: number;
    min?: number;
    attribute?: string;
    onUpdate?: onUpdate;
}
export default NumberItem;
