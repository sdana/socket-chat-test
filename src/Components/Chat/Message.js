import React, { Component } from "react";
import "./chat.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "../API/apiManager"

export default class Message extends Component {
  state = {
    editMode: false
  };

  componentDidMount() {
    this.setState({
      editedMessage: this.props.message.message
    });
    localStorage.setItem("messageChange", 1);
  }

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  render() {
    let classNamesForUser = "";
    //Set className variables for displaying user name colors
    if (this.props.message.user.id == this.props.currentUser) {
      classNamesForUser = "msgUser msgText me";
    } else {
      classNamesForUser = "msgUser msgText other";
    }
    // Normal Display
    if (!this.props.editMsgButtonDisplay) {
      return (
        <p id={this.props.message.id} className="msgItem">
          <span className={classNamesForUser}>
            {this.props.message.user.name}
          </span>
          <span className="msgSeperator msgText">:</span>
          <span className="msgContent msgText">
            {this.props.message.message}
          </span>
        </p>
      );
    }

    // Display Edit Options
    else if (this.props.editMsgButtonDisplay && !this.state.editMode) {
      //Check to see if the message belongs to the active user
      if (this.props.message.user.id == this.props.currentUser) {
        //If message belongs to active user display edit button
        return (
          <p id={this.props.message.id} className="msgItem">
            <button
              className="editMsgButton"
              onClick={() => {
                this.setState({
                  editMode: true
                });
              }}
            >
              <FontAwesomeIcon icon="edit" />
              Edit
            </button>
            <span className={classNamesForUser}>
              {this.props.message.user.name}
            </span>
            <span className="msgSeperator msgText">:</span>
            <span className="msgContent msgText">
              {this.props.message.message}
            </span>
          </p>
        );
      } else {
        //If message does not belong to current user display add friend button
        return (
          <p id={this.props.message.id} className="msgItem">
            <button
              className="addFriendButton"
              onClick={() => {
                api.allFriends().then(response => {
                  if (response.includes(String(this.props.message.user.id))) {
                    alert(`You're already friends with ${this.props.message.user.name}`)
                  }
                  else {
                    if (window.confirm(`Are you sure you wan to add ${this.props.message.user.name} as a friend?`))
                      this.props.beFriend(String(this.props.message.user.id))
                  }
                })
              }
            }
          >
              <FontAwesomeIcon icon="user-plus" />
            </button>
            <span className={classNamesForUser}>
              {this.props.message.user.name}
            </span>
            <span className="msgSeperator msgText">:</span>
            <span className="msgContent msgText">
              {this.props.message.message}
            </span>
          </p>
        );
      }
    } else {
      return (
        <p id={this.props.message.id} className="msgItem">
          <button
            className="saveMsgEditsButton"
            onClick={() => {
              this.props.update(
                this.props.message.id,
                this.props.currentUser,
                this.state.editedMessage,
                this.props.message.timeStamp
              );
              this.setState({ editMode: false });
            }}
          >
            <FontAwesomeIcon icon="save" />
          </button>
          <button
            className="deleteMsgButton"
            onClick={() => {
              this.props.delete(this.props.message.id);
            }}
          >
            <FontAwesomeIcon icon="times-circle" />
          </button>
          <button
            className="cancelMsgEditButton"
            onClick={() => {
              this.setState({
                editMode: false
              });
            }}
          >
            <FontAwesomeIcon icon="ban" />
          </button>
          <span className="msgUser msgText me">
            {this.props.message.user.name}
          </span>
          <span className="msgSeperator msgText" />
          <input
            onFocus={e => e.target.select()}
            className="editMsgInput msgText"
            value={this.state.editedMessage}
            onChange={this.handleFieldChange}
            type="text"
            id="editedMessage"
            required=""
            autoFocus=""
          />
        </p>
      );
    }
  }
}
