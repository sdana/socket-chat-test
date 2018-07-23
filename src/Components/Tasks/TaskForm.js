import React, { Component } from "react"
import apiManager from "../API/apiManager"

// This component represents the form that is used when adding a new task and when editing a current task
// Author: Elliot Huck
export default class TaskForm extends Component {

  state = {
    currentTaskId: this.props.currentTask.id,
    // These two properties are updated by handleFieldChange() and used in addNewTask() as the properties that get passed to the POST
    currentTaskName: this.props.currentTask.description,
    currentTaskDate: this.props.currentTask.date
  }

  // Updates state whenever an input field is edited
  handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  // Handles the submit event for the task form
  handleSubmit = (evt) => {
    evt.preventDefault()

    const currentUserId = sessionStorage.getItem("activeUser");
    const taskId = this.state.currentTaskId;
    const taskName = this.state.currentTaskName;
    const taskDate = this.state.currentTaskDate;

    // Checks if the user is editing (the task has an id) or creating a new task
    if (this.props.currentTask.id) {
      // Puts the edited task
      apiManager.editTask(currentUserId, taskId, taskName, taskDate)
        .then(
          this.props.loadTasks,
          this.props.hideForm()
        )
    } else {
      // Posts the new task
      apiManager.postTask(currentUserId, taskName, taskDate)
        .then(
          this.props.loadTasks,
          this.props.hideForm()
        )
    }
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <section>
          <label htmlFor="currentTaskName">Task name:</label>
          <input required type="text" id="currentTaskName"
            defaultValue={this.props.currentTask.description}
            onChange={this.handleFieldChange}>
          </input>
        </section>

        <section>
          <label htmlFor="currentTaskDate">Date due:</label>
          <input required type="date" id="currentTaskDate"
            defaultValue={this.props.currentTask.date}
            min={this.props.today}
            onChange={this.handleFieldChange}>
          </input>
        </section>

        <section>
          <button type="submit">Save task</button>
          <button onClick={() => { this.props.hideForm() }}>Cancel</button>
        </section>
      </form>
    )
  }
}