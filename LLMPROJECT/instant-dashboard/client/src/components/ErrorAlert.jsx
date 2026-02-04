import React from 'react';

function ErrorAlert({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="error-alert">
      <div className="error-content">
        <strong>Error:</strong> {message}
      </div>
      <button className="error-close" onClick={onClose}>
        ×
      </button>
    </div>
  );
}

export default ErrorAlert;
