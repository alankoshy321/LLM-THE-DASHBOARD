import React from 'react';

function JsonInput({ value, onChange }) {
  return (
    <div className="input-section">
      <label htmlFor="json-input">
        JSON Data
        <span className="label-hint">Paste your JSON data here</span>
      </label>
      <textarea
        id="json-input"
        className="json-textarea"
        value={value}
        onChange={onChange}
        placeholder='{"expenses": [{"category": "Food", "amount": 250}], "total": 250}'
        rows={12}
      />
    </div>
  );
}

export default JsonInput;
