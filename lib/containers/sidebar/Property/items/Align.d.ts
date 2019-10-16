/// <reference types="react" />
declare const AlignItem: ({ align, title, onUpdate }: IAlignItemProps) => JSX.Element;
interface IAlignItemProps {
    align?: TextAlgin;
    title?: string;
    onUpdate?: onUpdate;
}
export default AlignItem;
