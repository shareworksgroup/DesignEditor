import { IData } from '../schemas/transform';
import { IExtension } from 'src/containers/extension/Extension';
declare class Transform {
    data: IData;
    bodyWidth: number;
    extensions: IExtension[];
    constructor(rawData: IData, extensions: IExtension[]);
    toHtml(): string;
    private transferBody;
    private transferRow;
    private transferColumn;
    private transferContent;
    private getExtensionByType;
}
export default Transform;
