import { observable, action, toJS, runInAction, set, remove } from 'mobx';
import * as Util from '../lib/util';
import _ from 'lodash';
import { DesignType, OperationMode } from '../lib/enum';

const NoColor = 'rgba(255, 255, 255, 0)';

class DesignState {
  transparent: any


  constructor(transparent) {
    this.transparent = transparent;
  }

  @observable
  data = {
    body: {
      rows: [],
      values: {
        backgroundColor: "#ffffff",
        width: 800,
        fontFamily: 'MicroSoft Yahei',
        containerPadding: '0px',
        _meta:{
          guid: this.guid(),
          type: DesignType.BODY
        }
      }
    }
  };

  @observable
  selected = null;

  @action
  setSelected(guid) {
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

  @observable
  extensions = [];

 

  @action
  addExtension(extension){
    this.extensions.push(extension);
  }

  getExtension(type){
    return this.extensions.find(i => i.type === type);
  }

  getExtensions(){
    return toJS(this.extensions);
  }

  attribute = {};

  setAttribute(type, attribute) {
    this.attribute[type] = attribute;
  }

  getData(){
    return toJS(this.data);
  }

  @action
  setData(json){
    this.data = json;
  }

  @action
  addRow(row){
    this.data.body.rows.push({
      cells: row.cells,
      columns: row.cells.map(i => ({
        contents: [],
        values: {
          _meta:{
            guid: this.guid(),
            type: DesignType.COLUMN
          }
        }
      })),
      values: {
        backgroundColor: NoColor,
        columnsBackgroundColor: NoColor,
        deletable: true,
        draggable: true,
        noStackMobile: false,
        padding: "10px",
        selectable: true,
        _meta: {
          guid: this.guid(),
          type: DesignType.ROW,
          subtype: row.type,
        }
      }
    });
  }

  @action
  insertRow(row, guid) {
    const index = _.findIndex(this.data.body.rows, row => row.values._meta.guid === guid);
    this.data.body.rows.splice(index, 0, {
      cells: row.cells,
      columns: row.cells.map(i => ({
        contents: [],
        values: {
          _meta:{
            guid: this.guid(),
            type: DesignType.COLUMN
          }
        }
      })),
      values: {
        backgroundColor: NoColor,
        columnsBackgroundColor: NoColor,
        deletable: true,
        draggable: true,
        noStackMobile: false,
        padding: "10px",
        selectable: true,
        _meta: {
          guid: this.guid(),
          type: DesignType.ROW,
          subtype: row.type,
        }
      }
    });
  }

  @action
  moveRow(row, offsetGuid) {
    const moveGuid = row.guid;
    const rows = this.data.body.rows;
    const index = _.findIndex(rows, row => row.values._meta.guid === moveGuid);
    const rowData = rows.splice(index, 1)[0];
    if (offsetGuid) {
      const offsetIndex = _.findIndex(rows, row => row.values._meta.guid === offsetGuid);
      rows.splice(offsetIndex, 0, rowData);
    } else {
      rows.push(rowData);
    }
  }

  @action
  addContent(content, meta){
    this.data.body.rows.forEach((row, index) => {
      const column = row.columns.filter((column) => column.values._meta.guid === meta.guid)[0];
      if (column) {
        column.contents.push({
          values:{
            ...this.attribute[content.type],
            _meta: {
              guid: this.guid(),
              subtype: content.type,
              type: DesignType.CONTENT
            }
          }
        })
      }
    });
  }

  @action
  insertContent(content, offsetGuid, columnGuid){
    this.data.body.rows.forEach((row, index) => {
      const column = row.columns.filter((column) => column.values._meta.guid === columnGuid)[0];
      if (column) {
        const index = _.findIndex(column.contents, content => content.values._meta.guid === offsetGuid);
        column.contents.splice(index, 0, {
          values:{
            ...this.attribute[content.type],
            _meta: {
              guid: this.guid(),
              subtype: content.type,
              type: DesignType.CONTENT
            }
          }
        })
      }
    });
  }

  @action
  moveContent(content, offsetGuid, columnGuid){
    // get and remove content from old position
    const contentData = this.getContent(content.guid, OperationMode.REMOVE);
    this.data.body.rows.some((row) => {
      const column = row.columns.filter((column) => column.values._meta.guid === columnGuid)[0];
      if (column) {
        const contents = column.contents;

        if (offsetGuid) {
          const offsetIndex = _.findIndex(contents, content => content.values._meta.guid === offsetGuid);
          contents.splice(offsetIndex, 0, contentData);
        } else {
          contents.push(contentData);
        }
        return true;
      }
      return false;
    });
  }

  @action
  getContent(guid, operation?: OperationMode) {
    let content = null;
    this.data.body.rows.some((row) => {
      row.columns.some((column) => {
        content = column.contents.filter(content => content.values._meta.guid === guid)[0];
        if (content && operation) {
          const index = _.findIndex(column.contents, content => content.values._meta.guid === guid);
          if (operation === OperationMode.REMOVE) {
            column.contents.splice(index, 1);
          } else if (operation === OperationMode.COPY) {
            const copy = JSON.parse(JSON.stringify(content));
            copy.values._meta.guid = this.guid();
            column.contents.splice(index+1, 0, copy);
          }
        }
        return !!content;
      });
      return !!content;
    });
    return content;
  }

  @action
  deleteContent(guid){
    this.getContent(guid, OperationMode.REMOVE);
    this.setSelected(null);
  }

  @action
  deleteRow(guid) {
    const index = _.findIndex(this.data.body.rows, row => row.values._meta.guid === guid);
    this.data.body.rows.splice(index, 1);
    this.setSelected(null);
  }

  @action
  copyContent(guid) {
    this.getContent(guid, OperationMode.COPY);
  }

  @action
  copyRow(guid) {
    const row = this.getRow(guid);
    const index = _.findIndex(this.data.body.rows, row => row.values._meta.guid === guid);
    const copy = JSON.parse(JSON.stringify(row));
    copy.values._meta.guid = this.guid();
    _.each(copy.columns, column => {
      column.values._meta.guid = this.guid();
      _.each(column.contents, content => {
        content.values._meta.guid = this.guid();
      });
    });
    this.data.body.rows.splice(index + 1, 0, copy);
  }

  getRow(guid) {
    return this.data.body.rows.filter(row => row.values._meta.guid === guid)[0];
  }

  getColumn(guid) {
    let column = null;
    this.data.body.rows.some((row) => {
      column = row.columns.filter((column) => column.values._meta.guid === guid)[0];
      return !!column;
    });
    return column;
  }

  @action
  updateAttribute(guid, key, value){
    const data = this.getRow(guid) || this.getContent(guid);
    if (data) {
      data.values = {...data.values, ...{ [key]: value }};
    }
  }

  @action
  updateBodyAttribute(key, value){
    const data = this.data.body
    if (data) {
      data.values = {...data.values, ...{ [key]: value }};
    }
  }

  getDataByGuid(guid){
    return this.getRow(guid) || this.getContent(guid);
  }

  guid(){
    return Util.guid();
  }

}

export default DesignState;