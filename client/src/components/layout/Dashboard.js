import React, { Component } from 'react'
import LoginNavbar from './LoginNavbar'
import { Link } from 'react-router-dom'
import Footer from './Footer'
import { ToastContainer, toast } from "react-toastify"
import axios from 'axios'

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      loginUserData: null
    }
  }

  componentDidMount() {
    axios.get('/api/users/current', {
      headers: {
        "Authorization": localStorage.token,
        "Content-Type": "application/json"
      }
    })
      .then(current => this.setState({
        loginUserData: current.data
      }))
      .catch((err) => { console.log(err) })
  }

  //delete experience
  handleDelete = (id) => {
    axios.delete(`/api/profile/experience/${id}`, {
      headers: {
        "Authorization": localStorage.token,
        "Content-Type": "application/json"
      }
    })

      .then(exp => this.getData())
      .then(notify => toast.error("Experience Deleted ", {
        position: toast.POSITION.TOP_RIGHT
      }))
      .catch(err => console.log(err))

  }

  //delete education
  handleDeleteEducation = (id) => {
    axios.delete(`/api/profile/education/${id}`, {
      headers: {
        "Authorization": localStorage.token,
        "Content-Type": "application/json"
      }
    })
      .then(edu => this.getData())
      .then(notify => toast.error("Education Deleted ", {
        position: toast.POSITION.TOP_RIGHT
      }))
      .catch(err => console.log(err))
  }

  //get data on delete
  getData = () => {
    axios.get('/api/users/current', {
      headers: {
        "Authorization": localStorage.token,
        "Content-Type": "application/json"
      }
    })
      .then(current => this.setState({
        loginUserData: current.data
      }))
      .catch((err) => { console.log(err) })
  }

  deleteAccount = () => {
    axios.delete('/api/profile', {
      headers: {
        "Authorization": localStorage.token,
        "Content-Type": "application/json"
      }
    })
    .then(user => 
      toast.error("Account Deleted ", {
        position: toast.POSITION.TOP_RIGHT
      }))
      .then(u => window.location.href = '/')
  }


  render() {
    { console.log(this.state.loginUserData) }
    return (
      <div>
        {
          (localStorage.token) ? <LoginNavbar /> : ""
        }
        <div className="dashboard">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 className="display-4">Dashboard</h1>
                <p className="lead text-muted">
                  Welcome {this.state.loginUserData && this.state.loginUserData.currentUser.name}
                </p>

                <div className="btn-group mb-4" role="group">
                  <Link to="/edit-profile" className="btn btn-light">
                    <i className="fas fa-user-circle text-info mr-1"></i> Edit Profile</Link>
                  <Link to="/add-experience" className="btn btn-light">
                    <i className="fab fa-black-tie text-info mr-1"></i>
                    Add Experience</Link>
                  <Link to="/add-education" className="btn btn-light">
                    <i className="fas fa-graduation-cap text-info mr-1"></i>
                    Add Education</Link>
                </div>
                <div>
                  <h4 className="mb-2">Experience Credentials</h4>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Company</th>
                        <th>Title</th>
                        <th>Years</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {(this.state.loginUserData && this.state.loginUserData.currentUser.profileId) ? this.state.loginUserData && this.state.loginUserData.currentUser.profileId.experience.map(exp => {
                        return <tr>
                          <td>{exp.company}</td>
                          <td>{exp.title}</td>
                          <td>
                            {new Date(exp.from).getDate() + '/' + new Date(exp.from).getMonth() + '/' + new Date(exp.from).getFullYear()} - {(!exp.current) ? new Date(exp.to).getDate() + '/' + new Date(exp.to).getMonth() + '/' + new Date(exp.to).getFullYear() : "Now"}
                          </td>
                          <td>
                            <button onClick={() => this.handleDelete(exp._id)} className="btn btn-danger">
                              Delete
                   </button>
                          </td>
                        </tr>
                      }) : null}

                    </tbody>
                  </table>
                </div>
                <div>
                  <h4 className="mb-2">Education Credentials</h4>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>School</th>
                        <th>Degree</th>
                        <th>Years</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {(this.state.loginUserData && this.state.loginUserData.currentUser.profileId) ? this.state.loginUserData && this.state.loginUserData.currentUser.profileId.education.map(edu => {
                        return <tr>
                          <td>{edu.school}</td>
                          <td>{edu.degree}</td>
                          <td>
                            {new Date(edu.from).getDate() + '/' + new Date(edu.from).getMonth() + '/' + new Date(edu.from).getFullYear()} - {(!edu.current) ? new Date(edu.to).getDate() + '/' + new Date(edu.to).getMonth() + '/' + new Date(edu.to).getFullYear() : "Now"}
                          </td>
                          <td>
                            <button onClick={() => this.handleDeleteEducation(edu._id)} className="btn btn-danger">
                              Delete
                          </button>
                          </td>
                        </tr>
                      }) : null}

                    </tbody>
                  </table>
                </div>
                <div>
                  <button className="btn btn-danger mb-5" onClick={this.deleteAccount}>
                    Delete My Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <ToastContainer />
      </div>
    )
  }
}

export default Dashboard;
