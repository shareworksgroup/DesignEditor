import React from 'react';
declare class SideBar extends React.Component<ISideBarProps> {
    state: {
        active: number;
    };
    onUpdate: (key: any, value: any) => void;
    onTabClick: () => void;
    render(): JSX.Element;
}
interface ISideBarProps {
    rootStore?: any;
}
export default SideBar;
