import React from "react";

const SearchedFriend = props => {
  return (
    <li>
      <button className="add-btn"
        onClick={() => {
          props.beFriend(props.user.id);
          props.setAddFriendMode();
        }}
      >
        Add
      </button>
      {props.user.name}
    </li>
  );
};

export default SearchedFriend;
