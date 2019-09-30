import React from 'react';
import { IContentMeta } from 'src/schemas/transform';
declare abstract class Extension<P, T = any> extends React.Component<P & IExtendsionProps, T> {
    static check: boolean;
    componentWillUnmount(): void;
    abstract getIconClass(): string;
    abstract getLabel(): string;
    abstract getContentType(): string;
    abstract toHtml(json: IKeyValueMap): string;
    abstract getInitialAttribute(): P & IExtendsionProps;
    abstract getProperties(values: P & IExtendsionProps, update: onUpdate): React.ReactFragment;
}
export interface IExtendsionProps {
    focus?: boolean;
    onUpdate?: onUpdate;
    _meta?: IContentMeta;
}
export default Extension;
