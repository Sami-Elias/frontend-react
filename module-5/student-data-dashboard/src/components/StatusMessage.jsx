export default function StatusMessage({ type, message, onRetry }) {
  if (type === 'loading') {
    return (
      <div className="status-box loading">
        <div className="spinner"></div>
        <p>{message}</p>
      </div>
    );
  }

  if (type === 'error') {
    return (
      <div className="status-box error">
        <p>⚠️ <strong>Error:</strong> {message}</p>
        {onRetry && (
          <button onClick={onRetry} className="retry-btn">
            Try Again
          </button>
        )}
      </div>
    );
  }

  return null;
}