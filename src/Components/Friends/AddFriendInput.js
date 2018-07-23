import React from "react";

const AddFriendInput = ({ handleFieldChange, addFriendInput }) => {
  return (
    <input
      id="addFriendInput"
      onChange={e => {
        handleFieldChange(e);
      }}
      value={addFriendInput}
    />
  );
};

export default AddFriendInput;
