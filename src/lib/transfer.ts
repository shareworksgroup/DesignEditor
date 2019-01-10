import { ContentType, DesignType, RowType } from './enum';
import { HtmlBlock, Data, Body, Row, Column, Content, Extension } from './interface';
import _ from 'lodash';

class Transfer {

  data: Data = null;

  extensions: Array<Extension> = null;

  constructor(rawData: Data, extensions: Array<Extension>) {
    this.data = rawData;
    this.extensions = extensions;
  }

  public toHtml():string {
    const body = this.data.body;
    let htmlBlock = this.transferBody(this.data.body);
    _.each(body.rows, (row, index) => {
      const rowBlock = this.transferRow(row);
      const cells = row.cells;
      _.each(row.columns, (column, index) => {
        const columnBlock = this.transferColumn(column, cells[index]);
        _.each(column.contents, (content, index) => {
          const contentBlock = this.transferContent(content);
          columnBlock.content = `${columnBlock.content}${contentBlock}`;
        });
        rowBlock.content = `${rowBlock.content}${columnBlock.prefix}${columnBlock.content}${columnBlock.suffix}`;
      });
      htmlBlock.content = `${htmlBlock.content}${rowBlock.prefix}${rowBlock.content}${rowBlock.suffix}`;
    });
    return `${htmlBlock.prefix}${htmlBlock.content}${htmlBlock.suffix}`;
  }

  private transferBody(body: Body): HtmlBlock {
    const { backgroundColor, width, fontFamily, containerPadding } = body.values;
    return {
      prefix:`<div style="background-color:${backgroundColor};width:${width}px;font-family:${fontFamily};margin: 0 auto;padding:${containerPadding}">
      <style>
      @import url('https://fonts.googleapis.com/css?family=Charm|Open+Sans+Condensed:300|Oswald|Poppins|Roboto+Condensed|Sarabun|Slabo+27px|Source+Sans+Pro|Ubuntu|ZCOOL+KuaiLe|ZCOOL+QingKe+HuangYou|ZCOOL+XiaoWei');
      </style>`,
      content: '',
      suffix:'</div>',
    };
  }
  
  private transferRow(row: Row): HtmlBlock {
    const { backgroundColor, columnsBackgroundColor, padding } = row.values;
    return {
      prefix: `<div style="background-color:${backgroundColor};padding:${padding}">
      <table style="background-color:${columnsBackgroundColor};width:100%;table-layout: fixed;">
      <tr>`,
      content: '',
      suffix: `</tr></table></div>`
    };
  }
  
  private transferColumn(column: Column, rowspan: number): HtmlBlock {
    return {
      prefix:`<td colspan="${rowspan}" style="vertical-align:top;">`,
      content: '',
      suffix:`</td>`,
    }
  }

  private transferContent(content: Content): string{
    const Extension = this.getExtensionByType(content.values._meta.subtype);
    return new Extension().toHtml(content.values);
  }

  private getExtensionByType(type) {
    return this.extensions.filter((extension: Extension) => extension.type === type)[0];
  }

}




export default Transfer;