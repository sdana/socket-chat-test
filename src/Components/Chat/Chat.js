import React, { Component } from "react";
import messagesApi from "../API/apiManager";
import "./chat.css";
import Message from "./Message";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Chat extends Component {
  state = {
    currentUser: "",
    newMessageInput: "",
    messages: [],
    editMsgButtonDisplay: false,
  };
  //call API to get all messages
  read = () => {
    messagesApi.getMessages().then(msgArr => {
      this.setState({
        messages: msgArr
      });
      // Scroll to bottom
      this.refs.chatBottom.scrollIntoView({ behavior: "smooth" });
    });
  };

  create = (e, userId, message) => {
    //prevent form from reloading window
    e.preventDefault();
    //Check whether or not input field is empty
    if (this.state.newMessageInput === "") {
      alert("Please enter message text");
      return;
    }
    const curTimeStamp = new Date();
    messagesApi.postMessage(userId, message, curTimeStamp).then(() => {
      this.read();
    });
    //reset input form
    this.refs.newMessageInput.value = "";
    this.setState({ newMessageInput: ""})
    //create variable in local storage for storage event listener
    // let sS = localStorage.getItem("messageChange");
    // //Increment variable to fire local storage change event
    // localStorage.setItem("messageChange", ++sS);
    this.props.socket.emit("newMessage")
  };

  update = (msgId, userId, newMessage, messageTimeStamp) => {
    messagesApi
      .putMessage(msgId, userId, newMessage, messageTimeStamp)
      .then(() => {
        this.read();
      });
  };

  delete = msgId => {
    messagesApi.delMessage(msgId).then(this.read);
  };

  isAuthenticated = () => {
    return (
      sessionStorage.getItem("activeUser") || localStorage.getItem("activeUser")
    );
  };

  storageEvent = () => {
    //On local storage change get all messages
    this.read();
  };

  componentDidMount = () => {
    //Check local storage to see who's logged in and set state to reflect that
    const activeUser = this.isAuthenticated();
    if (activeUser) {
      this.setState({
        currentUser: activeUser
      });
      this.read();
    }
    window.addEventListener("storage", this.storageEvent);
  };

  editModeEnable = () => {
    //Set state for conditional rendering of edit functions
    switch (this.state.editMsgButtonDisplay) {
      case true:
        this.setState({ editMsgButtonDisplay: false });
        break;
      case false:
        this.setState({ editMsgButtonDisplay: true });
        break;
    }
  };

  handleFieldChange = evt => {
    //If edit mode is enabled, disable it as soon as user starts typing new message
    this.setState({ editMsgButtonDisplay: false });
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  render() {
    this.props.socket.on("tellClients", () => {console.log("NEW"); this.read()})
    return (
      <div className="chat" id="messagesDiv">
        <div id="messengerHeaderDiv">
          <p id="chat-head">Nutshell Chat</p>
          <button onClick={this.editModeEnable} id="msgOptionButton">
            <FontAwesomeIcon icon="cog" id="awesome-cog" />
          </button>
        </div>
        <div id="messengerBodyDiv">
          <div id="messengerBodyContent" ref="messengerBody">
            {this.state.messages.map(message => (
              <Message
                key={message.id}
                message={message}
                create={this.create}
                read={this.read}
                update={this.update}
                delete={this.delete}
                currentUser={this.state.currentUser}
                editMsgButtonDisplay={this.state.editMsgButtonDisplay}
                beFriend={this.props.beFriend}
              />
            ))}
            <div ref="chatBottom" />
          </div>
        </div>
        <div id="messageNewDiv">
          <form
            onSubmit={e => {
              this.create(
                e,
                this.state.currentUser,
                this.state.newMessageInput
              );
            }}
          >
            <input autoComplete="off"
              onChange={evt => {
                this.handleFieldChange(evt);
              }}
              id="newMessageInput"
              ref="newMessageInput"
            />
            <button
              onClick={e => {
                this.create(
                  e,
                  this.state.currentUser,
                  this.state.newMessageInput
                );
              }}
              id="newMessageSubmitButton"
            >
              <FontAwesomeIcon icon="envelope" id="awesome-envelope" />
            </button>
          </form>
        </div>
      </div>
    );
  }
}
