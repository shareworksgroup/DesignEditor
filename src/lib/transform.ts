import { ContentType, DesignType, RowType } from './enum';
import { IHtmlBlock, IData, IBody, IRow, IColumn, IContent, IExtension } from '../schemas/transform';

class Transform {

  data: IData = null;

  bodyWidth: number = 600;

  extensions: Array<IExtension> = null;

  constructor(rawData: IData, extensions: Array<IExtension>) {
    this.data = rawData;
    this.extensions = extensions;
  }

  public toHtml(): string {
    const body = this.data.body;
    this.bodyWidth = this.data.body.values.width;
    let htmlBlock = this.transferBody(this.data.body);
    body.rows.forEach((row, index) => {
      const rowBlock = this.transferRow(row);
      const cells = row.cells;
      row.columns.forEach((column, index) => {
        const columnBlock = this.transferColumn(column, cells[index]);
        column.contents.forEach((content, index) => {
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
    const { backgroundColor, fontFamily, containerPadding } = body.values;
    return {
      prefix: `<div style="box-sizing: border-box;background-color:${backgroundColor};font-family:${fontFamily};margin: 0 auto;padding:${containerPadding}">
      <style>
      @import url('https://fonts.googleapis.com/css?family=Charm|Open+Sans+Condensed:300|Oswald|Poppins|Roboto+Condensed|Sarabun|Slabo+27px|Source+Sans+Pro|Ubuntu|ZCOOL+KuaiLe|ZCOOL+QingKe+HuangYou|ZCOOL+XiaoWei');
      body{margin:0}
      </style>`,
      content: '',
      suffix: '</div>',
    };
  }

  private transferRow(row: IRow): IHtmlBlock {
    const { backgroundColor, columnsBackgroundColor, padding, fullWidth, repeat, center, backgroundImage } = row.values;
    const bgStyle = `background-image:url(${backgroundImage});background-repeat:${repeat?'repeat':'no-repeat'};background-position:${center?'center top':'left top'}`;
    const wrapperStyle = fullWidth ? bgStyle : '';
    const contentStyle = fullWidth ? '' : bgStyle;
    return {
      prefix: `<div style="box-sizing: border-box;background-color:${backgroundColor};${wrapperStyle}">
      <div style="box-sizing: border-box;padding:${padding};width:${this.bodyWidth}px;margin:0 auto;${contentStyle}">
      <table style="width:100%;table-layout: fixed;border-spacing: 0;background-color:${columnsBackgroundColor};">
      <tr>`,
      content: '',
      suffix: `</tr></table></div></div>`
    };
  }

  private transferColumn(column: IColumn, rowspan: number): IHtmlBlock {
    return {
      prefix: `<td colspan="${rowspan}" style="vertical-align:top;overflow:hidden;padding: 0;border-spacing: 0;">`,
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