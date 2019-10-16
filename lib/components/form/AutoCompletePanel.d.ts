import React from 'react';
import './index.less';
declare class AutoCompletePanel extends React.Component<IAutoCompletePanelProps, IAutoCompletePanelState> {
    dom: HTMLDivElement;
    state: IAutoCompletePanelState;
    componentDidMount(): void;
    componentWillUnmount(): void;
    pressKey: (e: any) => void;
    onBodyClick: (e: any) => void;
    onItemClick: (item: any) => void;
    onRef: (dom: any) => void;
    render(): JSX.Element;
}
interface IAutoCompletePanelProps {
    data?: IItem[];
    show?: boolean;
    position?: IPosition;
    onClick?: (item: IItem) => void;
    onClose?: () => void;
}
interface IAutoCompletePanelState {
    index: number;
}
export default AutoCompletePanel;
