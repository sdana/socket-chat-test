import React, { Component } from "react";
import apiManager from "./../API/apiManager";
export default class NewEventButton extends Component {
  state = {
    viewForm: false
  };
  addEvent = () => {
    const eventName = document.querySelector("#eventName").value;
    const eventLocation = document.querySelector("#eventLocation").value;
    const eventDate = document.querySelector("#eventDate").value;

    return apiManager
      .postEvent(
        sessionStorage.getItem("activeUser"),
        eventName,
        eventLocation,
        eventDate
      )
      .then(this.props.getEvents);
  };
  render() {
    if (this.state.viewForm) {
      return (
        <React.Fragment>
          <input id="eventName" type="text" />
          <br />
          <input id="eventLocation" type="text" />
          <br />
          <input id="eventDate" type="date" />
          <br />
          <button
            onClick={() => {
              this.addEvent().then(
                console.log("got there"),
                this.setState({ viewForm: false })
              );
              console.log(this.props);
            }}
          >
            Save
          </button>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <button
            onClick={() => {
              this.setState({ viewForm: true });
            }}
          >
            New Event
          </button>
        </React.Fragment>
      );
    }
  }
}
