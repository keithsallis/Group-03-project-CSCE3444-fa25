import React, { useState } from 'react';

function ImportModal({ onClose, onImport, theme }) {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const isLight = theme === 'light';

  const handleCodeChange = (e) => {
    const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6);
    setCode(value);
    setError('');
  };

  const handleImport = async () => {
    if (code.length !== 6) {
      setError('Please enter a 6-character code');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await onImport(code);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to import story');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && code.length === 6) {
      handleImport();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div 
        className={`${isLight ? 'bg-white text-gray-900' : 'bg-gray-800 text-white'} rounded-lg shadow-2xl max-w-md w-full p-6`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Import Story</h2>
          <button
            onClick={onClose}
            className={`text-2xl ${isLight ? 'hover:text-gray-600' : 'hover:text-gray-300'} transition-colors`}
          >
            ×
          </button>
        </div>

        <p className={`mb-4 ${isLight ? 'text-gray-600' : 'text-gray-300'}`}>
          Enter the 6-character code to import a shared story:
        </p>

        <input
          type="text"
          value={code}
          onChange={handleCodeChange}
          onKeyPress={handleKeyPress}
          placeholder="XXXXXX"
          maxLength={6}
          className={`w-full text-center text-3xl font-bold tracking-widest px-4 py-3 rounded-lg border-2 mb-2 ${
            isLight
              ? 'bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500'
              : 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
          } focus:outline-none transition-colors`}
          autoFocus
        />

        {error && (
          <p className="text-red-500 text-sm mb-4">⚠️ {error}</p>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              isLight
                ? 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
            } disabled:opacity-50`}
          >
            Cancel
          </button>
          <button
            onClick={handleImport}
            disabled={isLoading || code.length !== 6}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              isLight
                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isLoading ? 'Importing...' : 'Import'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImportModal;
