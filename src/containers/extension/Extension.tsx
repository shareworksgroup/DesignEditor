import React, { Component } from 'react';
import { IContentMeta } from 'src/schemas/transform';
import { ContentType } from 'src/lib/enum';

abstract class Extension<P, T = any> extends React.Component<P & IExtensionProps, T> {

  static check: boolean = true;
  type: string;

  componentWillUnmount() {
    this.setState = (state: IExtendsionState, callback) => { };
  }

  abstract getIconClass(): string;

  abstract getLabel(): string;

  abstract getContentType(): string;

  abstract toHtml(json: IKeyValueMap): string;

  abstract getInitialAttribute(): P & IExtensionProps;

  abstract getProperties(values: P & IExtensionProps, update: onUpdate): React.ReactFragment;
}

export interface IExtensionProps {
  focus?: boolean;
  onUpdate?: onUpdate;
  _meta?: IContentMeta;
}

export interface IExtension<P=any> {
  new (props: any): React.Component<IExtensionProps, any, any>;
  type?: ContentType | string;
  group?: string;
  getContentType: () => string;
  getLabel: () => string;
  getIconClass: () => string;
  toHtml: (json: IKeyValueMap) => string;
  getInitialAttribute: () => P & IExtensionProps;
  getProperties: (values: P & IExtensionProps, update: onUpdate) => React.ReactFragment;
}

interface IExtendsionState {
}

export default Extension;