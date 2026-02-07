import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Critical Render Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#050816',
          color: 'white',
          padding: '2rem',
          textAlign: 'center',
          fontFamily: 'sans-serif'
        }}>
          <h1 style={{ color: '#ff006e', fontSize: '2.5rem', marginBottom: '1rem' }}>⚠️ Application Crash</h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem', opacity: 0.8 }}>
            A rendering error occurred. This is usually caused by a data initialization issue.
          </p>
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '1rem',
            borderRadius: '0.5rem',
            marginBottom: '2rem',
            maxWidth: '100%',
            overflow: 'auto',
            textAlign: 'left'
          }}>
            <code style={{ fontSize: '0.9rem', color: '#00d4ff' }}>
              {this.state.error && this.state.error.toString()}
            </code>
          </div>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'linear-gradient(to right, #00d4ff, #b829f5)',
              border: 'none',
              borderRadius: '0.5rem',
              color: 'white',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Reload Application
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
