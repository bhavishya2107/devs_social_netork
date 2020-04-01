import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class LoginNavbar extends Component {

  logout() {
    localStorage.clear();
    window.location.href = '/';
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
          <div className="container">
            <span className="navbar-brand">DevConnect</span>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="mobile-nav">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
             
                </li>
              </ul>

              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to="/post" className="nav-link" >
                  Post Feeds
            </Link>
                </li>
                <li className="nav-item">
                  <Link to="/dashboard" className="nav-link" href="#">
                    Dashboard
            </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" onClick={this.logout}>
                    <img className="rounded-circle" style={{ "width": "25px", "marginRight": "5px" }} src="https://www.gravatar.com/avatar/anything?s=200&d=mm"
                      alt="" title="You must have a Gravatar connected to your email to display an image" /> Logout
                  </Link>
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
