import React, { Component } from "react";
import apiManager from "./../API/apiManager";
import NewEventButton from "./NewEventButton";
import Event from "./Event";

export default class EventList extends Component {
  state = {
    events: []
  };

  getEvents = () => {
    apiManager.getField('events')
      .then(events => {
        this.setState({ events: events });
      })
      
  };

  componentDidMount() {
    this.getEvents();
  }

  render() {
    return (
      <React.Fragment>
        <div className="events">
          <h3 className="section-headline">Events</h3>
          <NewEventButton
            getEvents={() => {
              this.getEvents();
            }}
          />
          {this.state.events.map(event => {
            return this.props.friends.concat([sessionStorage.getItem('activeUser')]).includes(`${event.userId}`) &&
            (<Event
                key={event.id}
                styling={
                  event.userId == sessionStorage.getItem("activeUser")
                    ? "normal"
                    : "italics"
                }
                event={event}
                getEvents={this.getEvents}
              />
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}
