import React from 'react';
import AutoComplete from './autocomplete';
interface ITinyMceProps {
    focus?: boolean;
    value?: string;
    autoComplete?: boolean;
    config?: IKeyValueMap;
    onChange?: (type: string, content: string) => void;
    getContainer?: () => HTMLDivElement;
}
declare class TinyMce extends React.Component<ITinyMceProps> {
    _isMounted: boolean;
    autoComplete: AutoComplete;
    editor: any;
    state: {
        showDynamic: boolean;
        query: string;
        data: any[];
        position: {
            x: number;
            y: number;
        };
    };
    componentDidMount(): void;
    componentDidUpdate({ focus }: {
        focus: any;
    }): void;
    componentWillUnmount(): void;
    handleEditorChange: (editor: any) => void;
    insertDynamic: (value: any) => void;
    initAutoComplete: (editor: any) => void;
    getContainer: () => HTMLDivElement;
    render(): JSX.Element;
}
export default TinyMce;
