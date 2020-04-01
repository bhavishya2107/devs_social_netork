import React, { Component } from 'react'
import Navbar from '../layout/Navbar'
import axios from 'axios'


class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    }
  }

  onSubmit = (e) => {
    e.preventDefault()
    const newUser = {
      email: this.state.email,
      password: this.state.password
    }
    axios.post('/api/users/login', newUser)
      .then(user => {
        if (user.data.success) {
          localStorage.setItem('token', user.data.token)
          localStorage.setItem('id', user.data.id)
          window.location.href = '/dashboard'
        }
      })
      .catch(err => console.log(err.response.data))
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="login">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Login</h1>

                <form onSubmit={this.onSubmit}>

                  <div className="form-group">
                    <input type="email" className="form-control form-control-lg" placeholder="Email Address" name="email"
                      value={this.state.email} onChange={(e) => {
                        this.setState({
                          email: e.target.value
                        })
                      }} />
                  </div>
                  <div className="form-group">
                    <input type="password" className="form-control form-control-lg" placeholder="Password" name="password"
                      value={this.state.password} onChange={(e) => {
                        this.setState({
                          password: e.target.value
                        })
                      }} />
                  </div>
                  <input type="submit" className="btn btn-info btn-block mt-4" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;
