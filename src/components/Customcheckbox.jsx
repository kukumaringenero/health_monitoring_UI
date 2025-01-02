import React from "react";

const Customcheckbox = ({ label, checked, onChange, disabled }) => {
  return (
    <label className="checkbox-container">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <span className="checkbox-label">{label}</span>
    </label>
  );
};

export default Customcheckbox;
