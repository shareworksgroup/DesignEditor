import * as React from 'react';
export default class LazyRenderBox extends React.Component<ILazyRenderBoxProps, {}> {
    shouldComponentUpdate(nextProps: ILazyRenderBoxProps): boolean;
    render(): JSX.Element;
}
interface ILazyRenderBoxProps {
    hiddenClassName?: string;
    visible?: boolean;
    className?: string;
    style?: Object;
    key?: string;
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}
export {};
