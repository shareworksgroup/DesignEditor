/// <reference types="react" />
declare const LineHeight: ({ lineHeight, title, onUpdate }: ILineHeightProps) => JSX.Element;
interface ILineHeightProps {
    lineHeight?: number;
    title?: string;
    onUpdate?: onUpdate;
}
export default LineHeight;
