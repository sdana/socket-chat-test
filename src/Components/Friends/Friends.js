import React, { Component } from "react";
import APIManager from "../API/apiManager";
import AddFriendInput from "./AddFriendInput";
import Friend from "./Friend";
import SearchedFriends from "./SearchedFriends";

const apiManager = APIManager;

export default class Friends extends Component {
  state = {
    users: [],
    addFriendMode: false,
    addFriendInput: ""
  };

  delete = relId => {
    console.log("deleteFired", relId);
    apiManager.deleteFriend(relId).then(() => {
      console.log("then");
      this.props.readFriends();
    });
  };

  searchMatchUsers = () => {
    const searchString = this.state.addFriendInput;
    const users = this.state.users;
    const newSearchMatchUsers = [];
    users.forEach(user => {
      let alreadyFriend = false;
      if (this.props.friends.length > 0) {
        this.props.friends.forEach(friend => {
          if (String(user.id) === String(friend.user.id)) {
            alreadyFriend = true;
          }
        });
      }

      const lowerUserName = user.name.toLowerCase();
      if (
        String(user.id) !== String(sessionStorage.getItem("activeUser")) &&
        String(user.id) !== String(localStorage.getItem("activeUser")) &&
        lowerUserName.includes(searchString.toLowerCase()) &&
        alreadyFriend === false
      ) {
        newSearchMatchUsers.push(user);
      }
    });
    return newSearchMatchUsers;
  };

  componentDidMount() {
    apiManager.getUsers().then(users => {
      this.setState({
        users: users
      });
    });
  }

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  setAddFriendMode = () => {
    if (this.state.addFriendMode === false) {
      this.setState({
        addFriendMode: true
      });
    } else {
      this.setState({
        addFriendMode: false
      });
    }
  };

  render() {
    if (this.state.addFriendMode) {
      return (
        <div className="friends">
          <h4 className="section-headline">Friends</h4>
          <button id="cancel-add-friend-btn" onClick={this.setAddFriendMode}>
            Cancel
          </button>
          <AddFriendInput
            handleFieldChange={this.handleFieldChange}
            addFriendInput={this.state.addFriendInput}
          />
          <SearchedFriends
            addFriendInput={this.state.addFriendInput}
            searchMatchUsers={this.searchMatchUsers()}
            beFriend={this.props.beFriend}
            setAddFriendMode={this.setAddFriendMode}
          />
        </div>
      );
    } else {
      return (
        <div className="friends">
          <h4 className="section-headline">Your Friends</h4>
          <button id="search-users-btn" onClick={this.setAddFriendMode}>
            Search Users
          </button>
          {this.props.friends.map(friend => (
            <Friend
              key={friend.id}
              friendId={friend.id}
              user={friend.user}
              delete={this.delete}
            />
          ))}
        </div>
      );
    }
  }
}
