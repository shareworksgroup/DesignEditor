import { ContentType, DesignType, RowType } from './enum';
import { IHtmlBlock, IData, IBody, IRow, IColumn, IContent, IExtension } from '../schemas/transform';
import { each } from 'lodash';

class Transform {

  data: IData = null;

  extensions: Array<IExtension> = null;

  constructor(rawData: IData, extensions: Array<IExtension>) {
    this.data = rawData;
    this.extensions = extensions;
  }

  public toHtml(): string {
    const body = this.data.body;
    let htmlBlock = this.transferBody(this.data.body);
    each(body.rows, (row, index) => {
      const rowBlock = this.transferRow(row);
      const cells = row.cells;
      each(row.columns, (column, index) => {
        const columnBlock = this.transferColumn(column, cells[index]);
        each(column.contents, (content, index) => {
          const contentBlock = this.transferContent(content);
          columnBlock.content = `${columnBlock.content}${contentBlock}`;
        });
        rowBlock.content = `${rowBlock.content}${columnBlock.prefix}${columnBlock.content}${columnBlock.suffix}`;
      });
      htmlBlock.content = `${htmlBlock.content}${rowBlock.prefix}${rowBlock.content}${rowBlock.suffix}`;
    });
    return `${htmlBlock.prefix}${htmlBlock.content}${htmlBlock.suffix}`;
  }

  private transferBody(body: IBody): IHtmlBlock {
    const { backgroundColor, width, fontFamily, containerPadding } = body.values;
    return {
      prefix: `<div style="background-color:${backgroundColor};width:${width}px;font-family:${fontFamily};margin: 0 auto;padding:${containerPadding}">
      <style>
      @import url('https://fonts.googleapis.com/css?family=Charm|Open+Sans+Condensed:300|Oswald|Poppins|Roboto+Condensed|Sarabun|Slabo+27px|Source+Sans+Pro|Ubuntu|ZCOOL+KuaiLe|ZCOOL+QingKe+HuangYou|ZCOOL+XiaoWei');
      </style>`,
      content: '',
      suffix: '</div>',
    };
  }

  private transferRow(row: IRow): IHtmlBlock {
    const { backgroundColor, columnsBackgroundColor, padding } = row.values;
    return {
      prefix: `<div style="background-color:${backgroundColor};padding:${padding}">
      <table style="background-color:${columnsBackgroundColor};width:100%;table-layout: fixed;">
      <tr>`,
      content: '',
      suffix: `</tr></table></div>`
    };
  }

  private transferColumn(column: IColumn, rowspan: number): IHtmlBlock {
    return {
      prefix: `<td colspan="${rowspan}" style="vertical-align:top;overflow:hidden">`,
      content: '',
      suffix: `</td>`,
    }
  }

  private transferContent(content: IContent): string {
    const IExtension = this.getExtensionByType(content.values._meta.subtype);
    return new IExtension().toHtml(content.values);
  }

  private getExtensionByType(type) {
    return this.extensions.filter((extension: IExtension) => extension.type === type)[0];
  }

}

export default Transform;