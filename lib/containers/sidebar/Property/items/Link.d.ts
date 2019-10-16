/// <reference types="react" />
declare const Link: ({ title, linkType, link, onUpdate }: ILinkProps) => JSX.Element;
interface ILinkProps {
    title?: string;
    linkType?: string;
    link?: string;
    onUpdate?: onUpdate;
}
export default Link;
