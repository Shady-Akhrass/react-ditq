import React from 'react';

const ErrorFallback = ({ error }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
            <h2 className="text-xl font-semibold text-red-600 mb-4">عذراً، حدث خطأ ما</h2>
            <p className="text-gray-600 mb-4">{error.message}</p>
            <button
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                onClick={() => window.location.reload()}
            >
                حاول مرة أخرى
            </button>
        </div>
    );
};
export default ErrorFallback;