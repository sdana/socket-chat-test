import React, { Component } from "react"
import apiController from "./Components/API/apiManager" //was api
import "./styles/login.css"


export default class Login extends Component {
  // Set initial state
  state = {
    username: "",
    email: "",
    remember: false,
    redirect: false
  }

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  //Login Handler
  handleLogin = e => {
    e.preventDefault()
    apiController.getField(`users?name=${this.state.username}`).then(user => {
      //Check whether or not user exists by checking the return from ajax call. If return is empty array, or if the username or email dont match throw error
      if (
        user.length === 0 ||
        (user[0].email !== this.state.email ||
          user[0].name !== this.state.username)
      ) {
        alert(
          "I'm sorry, that username or email is incorrect or non-existent. Please try again."
        )
        return
      } else if (
        user[0].email === this.state.email && user[0].name === this.state.username) {
        sessionStorage.setItem("activeUser", user[0].id)
        //Set state for parent component to show user is logged in
        this.props.logUserIn()
      }
    })
  }

  registerUser(e){
    //Prevent page reload from form element submit
      e.preventDefault()
      //Get users name and email
      apiController.getField(`users?name=${this.state.username}`).then(nameResponse => {
          apiController.getField(`users?email=${this.state.email}`).then(emailResponse => {
                      //Check to see if username or email are already registered
                      if (nameResponse.length === 0 && emailResponse.length === 0) {
                          //if not, then register the user
                          apiController.postUser(this.state.username, this.state.email).then((response) => {
                            sessionStorage.setItem("activeUser", response.id)
                            //Call login function to set state in parent component
                              this.props.logUserIn()
                          })
                      }
                      else {
                          //if username or email are already registered, throw an error
                          alert("Sorry, that username or email is already registered")
                          return
                      }
                  })
              })
          }
  render() {
    return (
      <div id="login-stuff">
      <form>
          <img id="headline-image" src="https://downloads.intercomcdn.com/i/o/2702/25ce9574b3a1dc309da496fc/Nutshell-logo-white%402x.png" />
          <h3 className="secondary-headline">Please log in or register a new account</h3>
          <label className="marginLeft" htmlFor="inputUname">Username</label>
        <input
          onChange={this.handleFieldChange}
          type="text"
          ref="usernameInput"
          id="username"
          placeholder="Username"
          required=""
          autoFocus=""
            className="marginLeft login-input"
        />
        <label className="marginLeft" htmlFor="inputEmail">E-mail</label>
        <input
          onChange={this.handleFieldChange}
          type="email"
          ref="emailInput"
          id="email"
          placeholder="E-mail"
          required=""
          className="marginLeft login-input"
        />
        <button className="marginLeft login-button" type="submit" onClick={this.handleLogin}>Sign in</button>
        <button id="register" className="marginLeft login-button" onClick={(e) => this.registerUser(e)}>Register</button>
      </form>
      </div>
    )
  }
}
// }
