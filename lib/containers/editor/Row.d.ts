import React from 'react';
import { ConnectDropTarget, ConnectDragSource } from 'react-dnd';
declare class Row extends React.Component<IRowProps> {
    guid: string;
    subtype: string;
    constructor(props: any);
    state: {
        position: number;
    };
    setPosition(position: any): void;
    onSelect: (e: any) => void;
    onDelete: () => void;
    onCopy: () => void;
    render(): JSX.Element;
}
interface IRowProps {
    guid?: string;
    rootStore?: any;
    subtype?: string;
    width?: number;
    cells?: number[];
    connectDropTarget?: ConnectDropTarget;
    connectDragSource?: ConnectDragSource;
    isOver?: boolean;
    canDrop?: boolean;
}
export default Row;
