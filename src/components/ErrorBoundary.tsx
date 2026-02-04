import { Component, ErrorInfo } from 'react';

type State = {
  error: Error | undefined;
  hasError: boolean;
};

export class ErrorBoundary extends Component<{ children?: React.ReactNode }, State> {
  state: State = { error: undefined, hasError: false };

  static getDerivedStateFromError(e: Error) {
    return { hasError: true, error: e };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('error', error, errorInfo);
  }

  render() {
    if (this.state.error) {
      return (
        <div>
          <p>{this.state.error.name}</p>
          <p>{this.state.error.message}</p>
          <p>{this.state.error.stack}</p>
        </div>
      );
    }

    return this.props.children;
  }
}
