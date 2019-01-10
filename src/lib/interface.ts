import { ContentType, DesignType, RowType } from './enum';

export interface HtmlBlock {
  prefix: string,
  content: string,
  suffix: string,
}

export interface Data {
  body: Body
}

export interface Body {
  rows: Array<Row>,
  values: {
    backgroundColor: string,
    width: number,
    fontFamily: string,
    containerPadding: string,
    _meta: {
      guid: string,
      type: DesignType
    }
  }
}

export interface Row {
  cells: Array<number>,
  columns: Array<Column>,
  values: {
    backgroundColor: string,
    columnsBackgroundColor: string,
    noStackMobile: boolean,
    padding: string,
    selectable: string,
    _meta: {
      guid: string,
      type: DesignType,
      subtype: RowType
    },
  }
}

export interface Column {
  contents: Array<Content>,
  values: {
    _meta: {
      guid: string,
      type: DesignType,
    },
  }
}

export interface Content {
  values: TextValue | ButtonValue | HtmlValue | VideoValue | DividerValue | ImageValue
}

export interface TextValue {
  color: string,
  text: string,
  textAlign: string,
  lineHeight: number,
  padding: string,
  containerPadding: string,
  _meta: ContentMeta
}

export interface ButtonValue {
  linkType: string,
  text: string,
  link: string,
  color: string,
  padding: string,
  backgroundColor: string,
  hoverColor: string,
  textAlign: string,
  lineHeight: number,
  borderRadius: number,
  containerPadding: string,
  _meta: ContentMeta
}

export interface DividerValue {
  width: number,
  lineStyle: string,
  lineWidth: number,
  lineColor: string,
  textAlign: string,
  containerPadding: string,
  _meta: ContentMeta
}

export interface ImageValue {
  link: string,
  linkType: string,
  containerPadding: string,
  textAlign: string,
  fullWidth: boolean,
  alter: string,
  url: string,
  _meta: ContentMeta
}

export interface VideoValue {
  containerPadding: string,
  textAlign: string,
  fullWidth: boolean,
  url: string,
  _meta: ContentMeta
}

export interface HtmlValue {
  html: string,
  containerPadding: string,
  _meta: ContentMeta
}

export interface ContentMeta {
  guid: string,
  subtype: ContentType,
  type: DesignType
}



export interface Extension {
  new(),
  type: ContentType
}
