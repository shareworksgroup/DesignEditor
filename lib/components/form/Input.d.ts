import React from 'react';
import './index.less';
declare const _default: ({ addOn, value, className, style, onChange }: IInputProps) => JSX.Element;
export default _default;
interface IInputProps {
    addOn?: string;
    value?: string;
    className?: string;
    style?: IKeyValueMap;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
