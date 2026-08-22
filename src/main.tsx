import React, { StrictMode, ReactNode, ErrorInfo } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Global handler to catch and safely isolate third-party external script errors (e.g. Disqus, CDN telemetry)
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    // Cross-origin script errors with no details or external origin scripts
    if (
      event.message === 'Script error.' ||
      (typeof event.message === 'string' && event.message.toLowerCase().includes('script error')) ||
      (event.filename && (event.filename.includes('disqus') || !event.filename.startsWith(window.location.origin)))
    ) {
      event.preventDefault();
      console.warn('Suppressed third-party cross-origin script error:', event.message, event.filename);
    }
  });

  window.addEventListener('unhandledrejection', (event) => {
    const reasonStr = String(event.reason || '');
    if (reasonStr.includes('disqus') || reasonStr.toLowerCase().includes('script error')) {
      event.preventDefault();
      console.warn('Suppressed third-party promise rejection:', reasonStr);
    }
  });
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class RootErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  override state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Unhandled runtime error in SG Travel app:', error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  override render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#f9f9fc] flex flex-col items-center justify-center p-6 text-center font-sans">
          <div className="max-w-md w-full bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto text-xl font-bold">
              !
            </div>
            <h2 className="text-lg font-bold text-gray-900">Something went wrong</h2>
            <p className="text-xs text-gray-600 leading-relaxed">
              The application encountered an unexpected issue while loading data.
            </p>
            <button
              onClick={this.handleReload}
              className="w-full py-2.5 px-4 bg-[#83439c] hover:bg-[#723887] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RootErrorBoundary>
      <App />
    </RootErrorBoundary>
  </StrictMode>,
);
