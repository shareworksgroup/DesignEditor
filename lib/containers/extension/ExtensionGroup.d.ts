import React from 'react';
import { IExtensionProps, IExtension } from './Extension';
declare class ExtensionGroup extends React.Component<IExtensionGroupProps, IExtensionGroupStates> {
    componentDidMount(): void;
    initConfig(): void;
    render(): any;
}
export interface IExtensionGroupProps {
    children?: React.ReactElement<IExtensionProps, IExtension> | React.ReactElement<IExtensionProps, IExtension>[];
    rootStore?: any;
    title: string;
}
export interface IExtensionGroup<P = any> {
    new (props: any): React.Component<IExtensionGroupProps, any, any>;
}
interface IExtensionGroupStates {
}
export default ExtensionGroup;
