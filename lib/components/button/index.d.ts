import React from 'react';
import './index.less';
declare const Button: {
    (props: IButtonProps): JSX.Element;
    Group({ children, className }: IButtonGroupProps): JSX.Element;
};
interface IButtonProps {
    children?: React.ReactFragment;
    style?: IKeyValueMap;
    className?: string;
    icon?: string;
    loading?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
interface IButtonGroupProps {
    children?: React.ReactFragment;
    className?: string;
}
export default Button;
