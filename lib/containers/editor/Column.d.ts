import React from 'react';
import { ConnectDropTarget } from 'react-dnd';
import { IColumn } from 'src/schemas/transform';
declare class Column extends React.Component<IColumnProps> {
    onUpdate: (guid: any, key: any, value: any) => void;
    render(): React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)>) | (new (props: any) => React.Component<any, any, any>)>;
}
interface IColumnProps {
    column?: IColumn;
    guid?: string;
    rootStore?: any;
    size?: number | string;
    connectDropTarget?: ConnectDropTarget;
    isOver?: boolean;
    canDrop?: boolean;
}
export default Column;
