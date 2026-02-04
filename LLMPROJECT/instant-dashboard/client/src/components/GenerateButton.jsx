import React from 'react';


function GenerateButton({ onClick, loading }) {
  return (
    <button
      className={`generate-button ${loading ? 'loading' : ''}`}
      onClick={onClick}
      disabled={loading}
    >
      {loading ? (
        <>
          <span className="spinner"></span>
          Generating...
        </>
      ) : (
        'Generate Dashboard'
      )}
    </button>
  );
}

export default GenerateButton;
