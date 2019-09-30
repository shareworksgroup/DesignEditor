import { IData, IExtension } from '../schemas/transform';
declare class Transform {
    data: IData;
    bodyWidth: number;
    extensions: Array<IExtension>;
    constructor(rawData: IData, extensions: Array<IExtension>);
    toHtml(): string;
    private transferBody;
    private transferRow;
    private transferColumn;
    private transferContent;
    private getExtensionByType;
}
export default Transform;
