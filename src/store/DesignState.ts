import { observable, action, toJS, runInAction } from 'mobx';
import { guid, findIndex } from '../lib/util';
import { record } from '../lib/history';
import { DesignType, OperationMode, Position, ExtensionGroupGeneral } from '../lib/enum';
import { bodyValues, rowValues } from '../lib/values';
import { IRootStore } from '../schemas/common';
import { IData, IRow, IColumn, IContent, IRowType, IContentType, IContentMeta } from '../schemas/transform';
import { IExtension } from 'src/containers/extension/Extension';

class DesignState {

  transparent: IRootStore;

  constructor(transparent) {
    this.transparent = transparent;
    this.extensionGroups.add(ExtensionGroupGeneral);
  }

  @record()
  @action
  execCommand(method, ...rest) {
    this[method] && this[method](...rest);
  }

  @observable
  data: IData = {
    body: {
      rows: [],
      values: {
        ...bodyValues,
        _meta: {
          guid: this.guid(),
          type: DesignType.BODY
        }
      }
    }
  };

  @observable
  selected: string = null;

  @action
  setSelected(guid: string) {
    if (guid === this.selected) {
      return;
    }
    this.selected = null;
    setTimeout(() => {
      runInAction(() => {
        this.selected = guid;
      });
    });
  }

  @action
  deleteSelected() {
    if (!this.selected) return;
    if (this.getContent(this.selected)) {
      this.execCommand('deleteContent', this.selected);
    } else {
      this.execCommand('deleteRow', this.selected);
    }
  }

  @observable
  extensions: IExtension[] = [];

  @action
  addExtension(extension: IExtension) {
    this.extensions.push(extension);
  }

  getExtension(type: string): IExtension {
    return this.extensions.find(i => i.type === type);
  }

  getExtensions(): IExtension[] {
    return toJS(this.extensions);
  }

  extensionGroups: Set<string> = new Set<string>();

  @action
  addExtensionGroup(group: string) {
    this.extensionGroups.add(group);
  }

  getExtensionGroups() : string[] {
    return Array.from(this.extensionGroups);
  }

  attribute: Object = {};

  setAttribute(type: string, attribute: Object) {
    this.attribute[type] = attribute;
  }

  getData(): IData {
    return toJS(this.data);
  }

  @action
  setData(json: IData) {
    this.setSelected(null);
    this.data = json;
    this.compatibleWithOldData();
  }

  @action
  compatibleWithOldData() {
    this.data.body.rows.forEach(row => {
      row.columns.forEach(column => {
        column.contents.forEach(content => {
          const Extension = this.getExtension(content.values._meta.subtype);
          if (Extension) {
            const initAttributes = (new Extension({}) as any as IExtension).getInitialAttribute();
            content.values = { ...initAttributes, ...content.values };
          }
        });
      });
    });
  }

  @action
  addRow(row: IRowType) {
    this.data.body.rows.push({
      cells: row.cells,
      columns: row.cells.map(i => ({
        contents: [],
        values: {
          _meta: {
            guid: this.guid(),
            type: DesignType.COLUMN
          }
        }
      })),
      values: {
        ...rowValues,
        _meta: {
          guid: this.guid(),
          type: DesignType.ROW,
          subtype: row.type,
        }
      }
    });
  }

  @action
  insertRow(row: IRowType, guid: string, position = Position.BEFORE) {
    const index = findIndex(this.data.body.rows, row => row.values._meta.guid === guid);
    this.data.body.rows.splice(position === Position.BEFORE ? index : index + 1, 0, {
      cells: row.cells,
      columns: row.cells.map(i => ({
        contents: [],
        values: {
          _meta: {
            guid: this.guid(),
            type: DesignType.COLUMN
          }
        }
      })),
      values: {
        ...rowValues,
        _meta: {
          guid: this.guid(),
          type: DesignType.ROW,
          subtype: row.type,
        }
      }
    });
  }

  @action
  moveRow(row: IRowType, offsetGuid: string, position = Position.BEFORE) {
    const moveGuid = row.guid;
    const rows = this.data.body.rows;
    const index = findIndex(rows, row => row.values._meta.guid === moveGuid);
    const rowData = rows.splice(index, 1)[0];
    if (offsetGuid) {
      const offsetIndex = findIndex(rows, row => row.values._meta.guid === offsetGuid);
      rows.splice(position === Position.BEFORE ? offsetIndex : offsetIndex + 1, 0, rowData);
    } else {
      rows.push(rowData);
    }
  }

  @action
  addContent(content: IContentType, meta: IContentMeta) {
    this.data.body.rows.forEach((row, index) => {
      const column = row.columns.filter(column => column.values._meta.guid === meta.guid)[0];
      if (column) {
        column.contents.push({
          values: {
            ...this.attribute[content.type],
            _meta: {
              guid: this.guid(),
              subtype: content.type,
              type: DesignType.CONTENT
            }
          }
        });
      }
    });
  }

  @action
  insertContent(content: IContentType, offsetGuid: string, columnGuid: string, position = Position.BEFORE) {
    this.data.body.rows.forEach((row, index) => {
      const column = row.columns.filter(column => column.values._meta.guid === columnGuid)[0];
      if (column) {
        const index = findIndex(column.contents, content => content.values._meta.guid === offsetGuid);
        column.contents.splice(position === Position.BEFORE ? index : index + 1, 0, {
          values: {
            ...this.attribute[content.type],
            _meta: {
              guid: this.guid(),
              subtype: content.type,
              type: DesignType.CONTENT
            }
          }
        });
      }
    });
  }

  @action
  moveContent(content: IContentType, offsetGuid: string, columnGuid: string, position = Position.BEFORE) {
    // get and remove content from old position
    const contentData = this.getContent(content.guid, OperationMode.REMOVE);
    this.data.body.rows.some(row => {
      const column = row.columns.filter(column => column.values._meta.guid === columnGuid)[0];
      if (column) {
        const contents = column.contents;

        if (offsetGuid) {
          const offsetIndex = findIndex(contents, content => content.values._meta.guid === offsetGuid);
          contents.splice(position === Position.BEFORE ? offsetIndex : offsetIndex + 1, 0, contentData);
        } else {
          contents.push(contentData);
        }
        return true;
      }
      return false;
    });
  }

  @action
  getContent(guid: string, operation?: OperationMode): IContent {
    let content = null;
    this.data.body.rows.some(row => {
      row.columns.some(column => {
        content = column.contents.filter(content => content.values._meta.guid === guid)[0];
        if (content && operation) {
          const index = findIndex(column.contents, content => content.values._meta.guid === guid);
          if (operation === OperationMode.REMOVE) {
            column.contents.splice(index, 1);
          } else if (operation === OperationMode.COPY) {
            const copy = JSON.parse(JSON.stringify(content));
            copy.values._meta.guid = this.guid();
            column.contents.splice(index + 1, 0, copy);
          }
        }
        return !!content;
      });
      return !!content;
    });
    return content;
  }

  @action
  deleteContent(guid: string) {
    this.getContent(guid, OperationMode.REMOVE);
    this.setSelected(null);
  }

  @action
  deleteRow(guid: string) {
    const index = findIndex(this.data.body.rows, row => row.values._meta.guid === guid);
    this.data.body.rows.splice(index, 1);
    this.setSelected(null);
  }

  @action
  copyContent(guid: string) {
    this.getContent(guid, OperationMode.COPY);
  }

  @action
  copyRow(guid: string) {
    const row = this.getRow(guid);
    const index = findIndex(this.data.body.rows, row => row.values._meta.guid === guid);
    const copy = JSON.parse(JSON.stringify(row));
    copy.values._meta.guid = this.guid();
    copy.columns.forEach(column => {
      column.values._meta.guid = this.guid();
      column.contents.forEach(content => {
        content.values._meta.guid = this.guid();
      });
    });
    this.data.body.rows.splice(index + 1, 0, copy);
  }

  getRow(guid: string): IRow {
    return this.data.body.rows.filter(row => row.values._meta.guid === guid)[0];
  }

  getColumn(guid: string): IColumn {
    let column = null;
    this.data.body.rows.some(row => {
      column = row.columns.filter(column => column.values._meta.guid === guid)[0];
      return !!column;
    });
    return column;
  }

  @record(400)
  @action
  updateAttribute(guid: string, key: string, value: Object) {
    const data = this.getRow(guid) || this.getContent(guid);
    if (data) {
      data.values = { ...data.values, ...{ [key]: value } };
    }
  }

  @record(400)
  @action
  updateBodyAttribute(key: string, value: Object) {
    const data = this.data.body;
    if (data) {
      data.values = { ...data.values, ...{ [key]: value } };
    }
  }

  getDataByGuid(guid: string): IRow | IContent {
    return this.getRow(guid) || this.getContent(guid);
  }

  guid(): string {
    return guid();
  }

}

export default DesignState;