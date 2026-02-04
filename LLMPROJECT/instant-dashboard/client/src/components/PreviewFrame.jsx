import React from 'react';


function PreviewFrame({ html }) {
  return (
    <div className="preview-section">
      <h2>Dashboard Preview</h2>
      {html ? (
        <iframe
          className="preview-iframe"
          srcDoc={html}
          title="Dashboard Preview"
          sandbox="allow-same-origin"
        />
      ) : (
        <div className="preview-placeholder">
          <p>Your generated dashboard will appear here</p>
          <p className="preview-hint">Enter JSON data and instructions above, then click Generate Dashboard</p>
        </div>
      )}
    </div>
  );
}

export default PreviewFrame;
