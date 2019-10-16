/// <reference types="react" />
declare const RowProperty: ({ columnsBackgroundColor, backgroundColor, backgroundImage, noStackMobile, padding, fullWidth, repeat, center, _meta, onUpdate }: IRowPropertyProps) => JSX.Element;
interface IRowPropertyProps {
    columnsBackgroundColor?: string;
    backgroundColor?: string;
    backgroundImage?: string;
    noStackMobile?: boolean;
    padding?: string;
    fullWidth?: boolean;
    repeat?: boolean;
    center?: boolean;
    _meta?: {
        guid: string;
    };
    onUpdate?: onUpdate;
}
export default RowProperty;
