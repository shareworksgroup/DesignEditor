/// <reference types="react" />
declare const BodyProperty: ({ backgroundColor, width, fontFamily, containerPadding, onUpdate }: IBodyPropertyProps) => JSX.Element;
interface IBodyPropertyProps {
    backgroundColor: string;
    width: number;
    fontFamily: string;
    containerPadding: string;
    onUpdate: onUpdate;
}
export default BodyProperty;
