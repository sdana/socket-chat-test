import React from "react";
import SearchedFriend from "./SearchedFriend";

export default class SearchedFriends extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <ul>
        {this.props.searchMatchUsers.map(user => (
          <SearchedFriend
            key={user.id}
            user={user}
            beFriend={this.props.beFriend}
            setAddFriendMode={this.props.setAddFriendMode}
          />
        ))}
      </ul>
    );
  }
}
