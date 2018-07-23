import React, { Component } from "react"

export default class Header extends Component {
  render() {
    return (
    <React.Fragment>
    {/* <h1 className="header">Welcome to Nutshell!</h1 > */}
    <div className="header" id="main-image-container">
    <img className="headline-image" src="https://downloads.intercomcdn.com/i/o/2702/25ce9574b3a1dc309da496fc/Nutshell-logo-white%402x.png" />
    </div>
    </React.Fragment>
    )
}
}