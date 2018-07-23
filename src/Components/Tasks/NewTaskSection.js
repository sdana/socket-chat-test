import React, { Component } from "react"
import TaskForm from "./TaskForm"

// This module renders the section of the Tasks pane used for adding new Tasks
// Author: Elliot Huck
export default class NewTaskSection extends Component {

  state = {
    // This property is used in the render function is to determine whether to show the Add Task button or the New Task form
    // It is toggled to 'true' by clicking the Add Task button and to 'false' by clicking the Save Task button on the form
    addingTask: false,


  }

  hideNewTaskForm = () => {
    this.setState({ addingTask: false })
  }

  render() {

    // This conditional checks if you are adding a new task. If so, it prints the form to add the task; if not, it prints the button which, when clicked, will open the form by changing state
    if (this.state.addingTask) {
      return (
        <TaskForm
          currentTask={{}}
          today={this.props.today}
          hideForm={this.hideNewTaskForm}
          loadTasks={this.props.loadTasks}
        />
      )
    } else {
      return (
        <button
          onClick={() => {
            this.setState({ addingTask: true })
          }}>New task</button>
      )
    }
  }
}
