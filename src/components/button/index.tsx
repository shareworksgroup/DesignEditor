import React from 'react';
import classnames from 'classnames';
import './index.less';

const Button = (props: IButtonProps) => {
  const { children, style, className, icon = null, loading = false, onClick } = props;
  return <button className={classnames("button", className, icon && "icon")} style={style} onClick={onClick}>
    {loading && <i className="loading" />}
    {icon}
    <span>{children}</span>
  </button>;
};

Button.Group = ({ children, className }: IButtonGroupProps) => <div className={classnames("buttonGroup", className)}>{children}</div>;

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