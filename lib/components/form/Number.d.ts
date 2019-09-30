import React from 'react';
declare enum Operate {
    Minus = 1,
    Plus = 2
}
declare class Number extends React.Component<INumberProps> {
    onChange: (e: React.ChangeEvent<HTMLInputElement>, type?: Operate) => void;
    onMinus: () => void;
    onPlus: () => void;
    render(): JSX.Element;
}
interface INumberProps {
    value?: number;
    step?: number;
    max?: number;
    min?: number;
    className?: string;
    style?: IKeyValueMap;
    onChange?: (value: number) => void;
    formatter?: (value: number) => any;
    parser?: (value: string) => string;
}
export default Number;
