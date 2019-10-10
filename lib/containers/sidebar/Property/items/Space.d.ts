import React from 'react';
declare class Space extends React.Component<ISpaceProps, ISpaceState> {
    constructor(props: any);
    static computeState(props: ISpaceProps): {
        more: boolean;
        value: string;
        top: number;
        right: number;
        bottom: number;
        left: number;
        all: number;
    };
    static getDerivedStateFromProps(nextProps: any, prevState: any): {
        more: boolean;
        value: string;
        top: number;
        right: number;
        bottom: number;
        left: number;
        all: number;
    };
    onMore: (checked: boolean) => void;
    onChange: (operate: any, val: any) => void;
    render(): JSX.Element;
}
interface ISpaceProps {
    title?: string;
    value?: string;
    attribute?: string;
    onUpdate?: onUpdate;
}
interface ISpaceState {
    more?: boolean;
    all?: number;
    left?: number;
    top?: number;
    right?: number;
    bottom?: number;
}
export default Space;
