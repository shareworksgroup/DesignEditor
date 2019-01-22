import React from 'react';


class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
 
  componentDidCatch(error, info) {
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

export default ErrorBoundary;