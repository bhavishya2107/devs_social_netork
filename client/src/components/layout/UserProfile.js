import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import LoginNavbar from './LoginNavbar'
import Navbar from './Navbar'
import Footer from './Footer'

class UserProfile extends Component {
  constructor() {
    super()
    this.state = {
      userProfileData: null
    }
  }

  render() {
    console.log(this.props.userData)
    return (
      <div>
        {(localStorage.token) ? <LoginNavbar /> : <Navbar />}
        <div className="profile">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-6">
                    <Link to='/profiles' className="btn btn-light mb-3 float-left">Back To Profiles</Link>
                  </div>
                  <div className="col-6">

                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <div className="card card-body bg-info text-white mb-3">
                      <div className="row">
                        <div className="col-4 col-md-3 m-auto">
                          <img className="rounded-circle" alt="" />
                        </div>
                      </div>
                      <div className="text-center">
                        <h1 className="display-4 text-center">{this.props.userData && this.props.userData.user.name}</h1>
                        <p className="lead text-center">{this.props.userData && this.props.userData.status} at {this.props.userData && this.props.userData.company}</p>
                        <p>{this.props.userData && this.props.userData.location}</p>
                        <p>
                          <a className="text-white p-2" href="#">
                            <i className="fas fa-globe fa-2x"></i>
                          </a>
                          <a className="text-white p-2" href="#">
                            <i className="fab fa-twitter fa-2x">{(this.props.userData && this.props.userData.social && this.props.userData.social.twitter) ? this.props.userData && this.props.userData.social.twitter : null}</i>
                          </a>
                          <a className="text-white p-2" href="#">
                            <i className="fab fa-facebook fa-2x">{(this.props.userData && this.props.userData.social && this.props.userData.social.facebook) ? this.props.userData && this.props.userData.social.facebook : null}</i>
                          </a>
                          <a className="text-white p-2" href="#">
                            <i className="fab fa-linkedin fa-2x">{this.props.userData && this.props.userData.social && this.props.userData.social.linkedin ? this.props.userData && this.props.userData.social.linkedin : null}</i>
                          </a>
                          <a className="text-white p-2" href="#">
                            <i className="fab fa-instagram fa-2x">{this.props.userData && this.props.userData.social && this.props.userData.social.instagram ? this.props.userData && this.props.userData.social.instagram : null}</i>
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>


                <div className="row">
                  <div className="col-md-12">
                    <div className="card card-body bg-light mb-3">
                      <h3 className="text-center text-info">{this.props.userData && this.props.userData.user.name.split(' ')[0]}'s Bio</h3>
                      <p className="lead">{(this.props.userData && this.props.userData.bio) ? this.props.userData && this.props.userData.bio : "Please update your bio"}
                      </p>
                      <hr />
                      <h3 className="text-center text-info">Skill Set</h3>
                      <div className="row">
                        <div className="d-flex flex-wrap justify-content-center align-items-center">
                          {this.props.userData && this.props.userData.skills.map(skill => {
                            return <div class="p-3" style={{ "textTransform": "uppercase" }}>
                              <i class="fa fa-check">{skill}</i></div>
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <h3 className="text-center text-info">Experience</h3>
                    <ul className="list-group">
                      {this.props.userData && this.props.userData.experience.map(exp => {
                        return <li className="list-group-item">
                          <h4>{exp.company}</h4>
                          <p>  {new Date(exp.from).getDate() + '/' + new Date(exp.from).getMonth() + '/' + new Date(exp.from).getFullYear()} - {(exp.to) ? new Date(exp.from).getDate() + '/' + new Date(exp.to).getMonth() + '/' + new Date(exp.to).getFullYear() : "Now"}</p>
                          <p>
                            <strong>Position: </strong> {exp.title}</p>
                          <p>
                            <p>
                              <strong>Location: </strong> {exp.location}
                            </p>
                            <strong>Description: </strong> {exp.description}</p>
                        </li>
                      })}

                    </ul>
                  </div>
                  <div className="col-md-6">
                    <h3 className="text-center text-info">Education</h3>
                    <ul className="list-group">
                      {this.props.userData && this.props.userData.education.map(edu => {
                        return <li className="list-group-item">
                          <h4>{edu.school}</h4>
                          <p>  {new Date(edu.from).getDate() + '/' + new Date(edu.from).getMonth() + '/' + new Date(edu.from).getFullYear()} - {(edu.to) ? new Date(edu.from).getDate() + '/' + new Date(edu.to).getMonth() + '/' + new Date(edu.to).getFullYear() : "Now"}</p>
                          <p>
                            <strong>Degree: </strong>{edu.degree}</p>
                          <p>
                            <strong>Field Of Study: </strong>{edu.fieldofstudy}</p>
                          <p>

                            <strong>Description: </strong> {edu.description}</p>
                        </li>
                      })}
                    </ul>
                  </div>
                </div>
                <div ref="myRef">
                  <hr />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>

    )
  }
}

export default UserProfile
