/// <reference types="react" />
declare const Font: ({ title, fontFamily, onUpdate }: IFontProps) => JSX.Element;
interface IFontProps {
    title?: string;
    fontFamily?: string;
    onUpdate?: onUpdate;
}
export default Font;
