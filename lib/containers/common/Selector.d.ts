import React from 'react';
declare class Selector extends React.Component<ISelectorProps> {
    dragDom: HTMLDivElement;
    componentDidMount(): void;
    render(): JSX.Element;
}
interface ISelectorProps {
    placeholder?: string;
    type?: string;
    onDelete?: () => void;
    onCopy?: () => void;
    onRef?: (dragDom: HTMLDivElement) => void;
}
export default Selector;
