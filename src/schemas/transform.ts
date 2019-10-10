import { ContentType, DesignType, RowType } from '../lib/enum';

export interface IHtmlBlock {
  prefix: string;
  content: string;
  suffix: string;
}

export interface IData {
  body: IBody
}

export interface IBody {
  rows: Array<IRow>;
  values: {
    backgroundColor: string;
    width: number;
    fontFamily: string;
    containerPadding: string;
    _meta: {
      guid: string;
      type: DesignType
    }
  }
}

export interface IRow {
  cells: Array<number>;
  columns: Array<IColumn>;
  values: {
    backgroundColor: string;
    columnsBackgroundColor: string;
    noStackMobile: boolean;
    padding: string;
    deletable?: boolean;
    draggable?: boolean;
    selectable: boolean;
    fullWidth: boolean;
    repeat: boolean;
    center: boolean;
    backgroundImage: string;
    _meta: {
      guid: string;
      type: DesignType;
      subtype: RowType
    };
  }
}

export interface IRowType {
  cells: Array<number>;
  type: RowType;
  guid?: string
}

export interface IColumn {
  contents: Array<IContent>;
  values: {
    _meta: {
      guid: string;
      type: DesignType;
    };
  }
}

export interface IContent {
  values: ITextValue | IButtonValue | IHtmlValue | IVideoValue | IDividerValue | IImageValue
}

export interface IContentType {
  type: ContentType;
  guid?: string;
}

export interface ITextValue {
  color: string;
  text: string;
  textAlign: string;
  lineHeight: number;
  padding: string;
  containerPadding: string;
  _meta: IContentMeta
}

export interface IButtonValue {
  linkType: string;
  text: string;
  link: string;
  color: string;
  padding: string;
  backgroundColor: string;
  hoverColor: string;
  textAlign: string;
  lineHeight: number;
  borderRadius: number;
  containerPadding: string;
  _meta: IContentMeta
}

export interface IDividerValue {
  width: number;
  lineStyle: string;
  lineWidth: number;
  lineColor: string;
  textAlign: string;
  containerPadding: string;
  _meta: IContentMeta
}

export interface IImageValue {
  link: string;
  linkType: string;
  containerPadding: string;
  textAlign: string;
  fullWidth: boolean;
  alter: string;
  url: string;
  _meta: IContentMeta
}

export interface IVideoValue {
  containerPadding: string;
  textAlign: string;
  fullWidth: boolean;
  url: string;
  _meta: IContentMeta;
}

export interface IHtmlValue {
  html: string;
  containerPadding: string;
  _meta: IContentMeta;
}

export interface IContentMeta {
  guid: string;
  subtype: ContentType;
  type: DesignType;
}

export interface IExtension {
  new();
  type: ContentType;
}
