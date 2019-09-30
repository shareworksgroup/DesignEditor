import * as React from 'react';
declare class ErrorBoundary extends React.Component<IErrorBoundaryProps, IErrorBoundaryStates> {
    constructor(props: IErrorBoundaryProps);
    componentDidCatch(error: IError, info: React.ErrorInfo): void;
    render(): {};
}
interface IErrorBoundaryProps {
    tips?: string | React.ReactNode;
    children?: React.ReactNode;
}
interface IErrorBoundaryStates {
    hasError: boolean;
}
export default ErrorBoundary;
