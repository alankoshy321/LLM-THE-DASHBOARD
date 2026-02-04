import React from 'react';


function PromptInput({ value, onChange }) {
  return (
    <div className="input-section">
      <label htmlFor="prompt-input">
        Dashboard Instructions
        <span className="label-hint">Describe what you want to see</span>
      </label>
      <input
        id="prompt-input"
        type="text"
        className="prompt-input"
        value={value}
        onChange={onChange}
        placeholder="Create a dashboard with expense summary and table"
      />
    </div>
  );
}

export default PromptInput;
