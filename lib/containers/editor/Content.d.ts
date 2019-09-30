import React from 'react';
import { ConnectDropTarget, ConnectDragSource } from 'react-dnd';
declare class Content extends React.Component<IContentProps> {
    guid: string;
    subtype: string;
    _isMounted: boolean;
    constructor(props: any);
    state: {
        position: number;
    };
    componentDidMount(): void;
    componentWillUnmount(): void;
    onSelect: (e: any) => void;
    setPosition(position: any): void;
    onDelete: () => void;
    onCopy: () => void;
    render(): JSX.Element;
}
interface IContentProps {
    guid?: string;
    columnGuid?: string;
    type?: string;
    rootStore?: any;
    connectDropTarget?: ConnectDropTarget;
    connectDragSource?: ConnectDragSource;
    isOver?: boolean;
    canDrop?: boolean;
}
export default Content;
