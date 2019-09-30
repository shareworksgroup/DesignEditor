/// <reference types="react" />
declare const BorderRadius: ({ borderRadius, title, onUpdate }: IBorderRadiusProps) => JSX.Element;
interface IBorderRadiusProps {
    borderRadius?: number;
    title?: string;
    onUpdate?: onUpdate;
}
export default BorderRadius;
