import React from "react";

const Friend = props => {
  return (
    <li>
      <button className="remove-btn"
        onClick={() => {
          props.delete(props.friendId);
        }}
      >
        Remove
      </button>
      {props.user.name}
    </li>
  );
};

export default Friend;
