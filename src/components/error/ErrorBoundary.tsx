import * as React from 'react';

class ErrorBoundary extends React.Component<IErrorBoundaryProps, IErrorBoundaryStates> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: IError, info: React.ErrorInfo) {
    this.setState({ hasError: true });
  }

  render() {
    const { tips = 'SOMETHING WENT WRONG' } = this.props;
    if (this.state.hasError) {
      return tips;
    }
    return this.props.children;
  }
}

interface IErrorBoundaryProps {
  tips?: string | React.ReactNode;
  children?: React.ReactNode;
}

interface IErrorBoundaryStates {
  hasError: boolean;
}

export default ErrorBoundary;