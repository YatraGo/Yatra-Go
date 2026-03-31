import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, errorMessage: '' };
    }

    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            errorMessage: error?.message || 'Unexpected runtime error.',
        };
    }

    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-[#f7f1e4] flex items-center justify-center p-6">
                    <div className="w-full max-w-2xl rounded-3xl border border-amber-200 bg-white shadow-sm p-8">
                        <h1 className="text-3xl font-bold text-brand-dark mb-3">Page failed to render</h1>
                        <p className="text-gray-600 mb-4">A runtime error occurred while opening this page.</p>
                        <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-900 break-words">
                            {this.state.errorMessage}
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
