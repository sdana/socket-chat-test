import React, { Component } from 'react'
import {Route} from "react-router-dom"
import Login from "./Login"
import Main from "./Main"


export default class ApplicationViews extends Component {
    state = {
        loggedIn: false
    }
    isAuthenticated = () => {
        return sessionStorage.getItem("activeUser")
    }

    logUserIn = () => {
        this.setState({loggedIn: true})
    }

    render() {
        if (this.state.loggedIn || this.isAuthenticated()) {
            return (
                <React.Fragment>
                    <Route exact path="/" component={Main} />
                </React.Fragment>
            )
        }
        else {
            return (
                <React.Fragment>
                    <Route exact path="/" render={(props) => { return <Login key={Date.now()} logUserIn={this.logUserIn} /> }} />
                </React.Fragment>
            )
        }
    }
}