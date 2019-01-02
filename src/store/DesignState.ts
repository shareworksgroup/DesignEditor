import { observable, computed, action, decorate, autorun, keepAlive, reaction, when, configure, toJS, runInAction, set, remove } from 'mobx';
import * as Util from '../lib/util';
import _ from 'lodash';


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
        contentWidth: "450px",
        fontFamily: 'MicroSoft Yahei',
        _meta:{
          guid: this.guid(),
          type: 'u_body'
        }
      }
    }
  };

  @observable
  extensions = [];

  @action
  addExtension(extension){
    this.extensions.push(extension);
  }

  getExtension(type){
    return this.extensions.find(i => i.type === type);
  }

  getData(){
    return toJS(this.data);
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
            type: 'u_column'
          }
        }
      })),
      values: {
        backgroundColor: "",
        columnsBackgroundColor: "",
        deletable: true,
        draggable: true,
        noStackMobile: false,
        padding: "10px",
        selectable: true,
        _meta: {
          guid: this.guid(),
          type: 'u_row',
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
            type: 'u_column'
          }
        }
      })),
      values: {
        backgroundColor: "",
        columnsBackgroundColor: "",
        deletable: true,
        draggable: true,
        noStackMobile: false,
        padding: "10px",
        selectable: true,
        _meta: {
          guid: this.guid(),
          type: 'u_row',
          subtype: row.type,
        }
      }
    });
  }

  @action
  addContent(content, meta){
    this.data.body.rows.forEach((row, index) => {
      const column = row.columns.filter((column) => column.values._meta.guid === meta.guid)[0];
      if (column) {
        column.contents.push({
          type: content.type,
          values:{
            _meta: {
              guid: this.guid(),
              subtype: content.type
            }
          }
        })
      }
    });
  }

  getContent(guid) {
    let content = null;
    this.data.body.rows.some((row) => {
      row.columns.some((column) => {
        content = column.contents.filter(content => content.values._meta.guid === guid)[0];
        return !!content;
      });
      return !!content;
    });
    return content;
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

  guid(){
    return Util.guid();
  }
}

export default DesignState;