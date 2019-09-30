import React from 'react';
declare class Image extends React.Component<IImageProps> {
    timerGenerate: (duration: number, callback: Function) => {
        stop: () => void;
    };
    dropzone: HTMLLabelElement;
    state: {
        uploading: boolean;
        progress: number;
    };
    componentDidMount(): void;
    componentWillUnmount(): void;
    onPrevent: (e: any) => void;
    onDrop: (e: any) => void;
    onChange: (e: any) => void;
    render(): JSX.Element;
}
interface IImageProps {
    attribute?: string;
    url?: string;
    onUpdate?: onUpdate;
    title?: string;
    desc?: string;
    options?: boolean;
    fullWidth?: boolean;
    repeat?: boolean;
    center?: boolean;
}
export default Image;
