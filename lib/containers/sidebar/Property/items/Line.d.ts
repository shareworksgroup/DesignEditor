/// <reference types="react" />
declare const LineItem: ({ title, lineWidth, lineStyle, lineColor, onUpdate }: ILineItemProps) => JSX.Element;
interface ILineItemProps {
    title?: string;
    lineWidth?: number;
    lineStyle?: string;
    lineColor?: string;
    onUpdate?: onUpdate;
}
export default LineItem;
