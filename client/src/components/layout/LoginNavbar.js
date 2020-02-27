import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class LoginNavbar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
          <div className="container">
            <Link to="/" className="navbar-brand">DevConnect</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="mobile-nav">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <a className="nav-link" href="#"> Developers
            </a>
                </li>
              </ul>

              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a className="nav-link" href="#">
                  Feeds
            </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Dashboard
            </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <img className="rounded-circle" style={{ "width": "25px", "marginRight": "5px" }} src="https://www.gravatar.com/avatar/anything?s=200&d=mm"
                      alt="" title="You must have a Gravatar connected to your email to display an image" /> Logout
            </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

export default LoginNavbar
