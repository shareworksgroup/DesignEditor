import React from 'react';
import '../style/index.less';
declare class DesignEditor extends React.Component<IDesignEditorProps> {
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: any, nextState: any): void;
    initConfig(): void;
    export: () => string;
    getData: () => import("../schemas/transform").IData;
    setData: (json: any) => void;
    render(): JSX.Element;
}
interface IApi {
    export: () => void;
    getData: () => IKeyValueMap;
    setData: (json: IKeyValueMap) => void;
}
interface IDesignEditorProps {
    onRef?: (api: IApi) => void;
    mentions?: any;
    contents?: any;
    imageUploadUrl?: string;
    onUpload?: (data: IKeyValueMap) => string;
    onUploadError?: (error: Error) => void;
}
export default DesignEditor;
