import React from 'react';
declare class Group extends React.Component<IGroupProps, IGroupState> {
    state: IGroupState;
    toggle: () => void;
    render(): JSX.Element;
}
interface IGroupProps {
    title?: string;
}
interface IGroupState {
    height: 'auto' | number;
    expand: boolean;
}
export default Group;
