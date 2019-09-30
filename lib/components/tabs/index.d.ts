import React from 'react';
declare class Tabs extends React.Component<ITabsProps, ITabsState> {
    state: ITabsState;
    static Tab: typeof Tab;
    render(): JSX.Element;
}
interface ITabsProps {
    onClick?: (event: React.MouseEvent<HTMLDivElement | HTMLUListElement, MouseEvent>) => void;
}
interface ITabsState {
    selectedIndex: number;
}
declare class Tab extends React.Component<ITabProps> {
    render(): JSX.Element;
}
interface ITabProps {
    icon?: string;
    tab?: string;
}
export default Tabs;
