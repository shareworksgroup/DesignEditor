import React from 'react';
import './index.less';
declare class Align extends React.Component<IAlignProps> {
    render(): JSX.Element;
}
interface IAlignProps {
    align?: TextAlgin;
    onChange?: (align: TextAlgin) => void;
}
export default Align;
