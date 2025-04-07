import React from "react";

const NoteActions = ({ handleSubmit, onCancel }) => {
  return (
    <div className="d-flex justify-content-start mt-2">
      <button className="btn btn-success btn-sm me-2 px-3" onClick={handleSubmit}>
        Save
      </button>
      <button className="btn btn-danger btn-sm px-3" onClick={onCancel}>
        Cancel
      </button>
    </div>
  );
};

export default NoteActions;
