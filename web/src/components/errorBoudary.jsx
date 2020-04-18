import React from "react";

export default class ErrorBoudary extends React.Component {
  state = {
    haseError: false,
    error: null,
    errorInfo: null,
  };

  componentDidCatch(error, errorInfo) {
    this.setState({
      haseError: true,
      error,
      errorInfo,
    });
  }

  render() {
    return this.state.haseError ? (
      <div class="error">ops Error</div>
    ) : (
      this.props.children
    );
  }
}
