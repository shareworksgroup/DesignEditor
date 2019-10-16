import * as React from 'react';
declare class Portal extends React.Component<IPortalProps, {}> {
    container: HTMLDivElement;
    componentDidMount(): void;
    componentDidUpdate(prevProps: IPortalProps): void;
    componentWillUnmount(): void;
    createContainer(): void;
    getContainer: () => HTMLDivElement;
    removeContainer(): void;
    render(): any;
}
interface IPortalProps {
    getContainer?: Function;
    didUpdate?: Function;
}
export default Portal;
