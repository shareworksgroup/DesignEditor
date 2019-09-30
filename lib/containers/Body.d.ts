import React from 'react';
import { ConnectDropTarget } from 'react-dnd';
declare class Body extends React.Component<IBodyProps> {
    onBodyClick: () => void;
    render(): React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)>) | (new (props: any) => React.Component<any, any, any>)>;
}
interface IBodyProps {
    guid?: string;
    rootStore?: any;
    size?: number | string;
    connectDropTarget?: ConnectDropTarget;
    isOver?: boolean;
    canDrop?: boolean;
}
export default Body;
