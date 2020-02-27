import React, { Component } from 'react'
import LoginNavbar from './LoginNavbar'
import { Link } from 'react-router-dom'
import axios from 'axios'

class AddExperience extends Component {
  constructor() {
    super()
    this.state = {
      title: null,
      company: null,
      location: null,
      from: null,
      to: null,
      description: null,
      current: false
    }
  }

  addExperienceToLoginUser = (e) => {
    e.preventDefault()
    // let to = (this.state.current) ? "Now" : this.state.to
    const newExp = {
      title: this.state.title,
      company: this.state.company,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      description: this.state.description,
      current: this.state.current
    }
    axios.post('/api/profile/experience', newExp, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.token
      }
    })
      .then(addedExp => (addedExp.data) ?  window.location.href = '/dashboard' : null)
      .catch(err => console.log(err)) 
  }

  render() {
    return (
      <div>
        {
          (localStorage.token) ? <LoginNavbar /> : ""
        }
        <div className="section add-experience">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <Link to='/dashboard' className="btn btn-light">
                  Go Back
          </Link>
                <h1 className="display-4 text-center mb-5">Add Your Experience</h1>
                <form onSubmit={this.addExperienceToLoginUser}>
                  <div className="form-group">
                    <input type="text" className="form-control form-control-lg" placeholder="* Job Title" name="title" value={this.state.title}
                      onChange={(e) => {
                        this.setState({
                          title: e.target.value
                        })
                      }} />
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control form-control-lg" placeholder="* Company" name="company" value={this.state.company}
                      onChange={(e) => {
                        this.setState({
                          company: e.target.value
                        })
                      }} />
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control form-control-lg" placeholder="Location" name="location" value={this.state.location}
                      onChange={(e) => {
                        this.setState({
                          location: e.target.value
                        })
                      }} />
                  </div>
                  <h6>From Date</h6>
                  <div className="form-group">
                    <input type="date" className="form-control form-control-lg" name="from"
                      value={this.state.from}
                      onChange={(e) => {
                        this.setState({
                          from: e.target.value
                        })
                      }} />
                  </div>
                  <h6>To Date</h6>
                  <div className="form-group">
                    <input type="date" className="form-control form-control-lg" name="to"
                      onChange={(e) => {
                        this.setState({
                          to: e.target.value
                        })
                      }} />
                  </div>
                  <div className="form-check mb-4">
                    <input className="form-check-input" type="checkbox" name="current" checked={this.state.current} onClick={() => {
                      this.setState({
                        current: !this.state.current
                      })
                    }} id="current" />
                    <label className="form-check-label" htmlFor="current">
                      Current Job
                    </label>
                  </div>
                  <div className="form-group">
                    <textarea className="form-control form-control-lg" placeholder="Job Description" name="description" value={this.state.description} onChange={(e) => {
                      this.setState({
                        description: e.target.value
                      })
                    }}></textarea>
                    <small className="form-text text-muted">Some of your responsabilities, etc</small>
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

export default AddExperience;
