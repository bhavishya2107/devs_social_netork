import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Footer from './Footer'
import LoginNavbar from './LoginNavbar'
import Axios from 'axios'

class EditProfile extends Component {
  constructor() {
    super()
    this.state = {
      handle: null,
      company: null,
      website: null,
      location: null,
      skills: null,
      bio: null,
      githubUsername: null,
      youtube: null,
      twitter: null,
      facebook: null,
      linkedin: null,
      instagram: null,
      status: null
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  editProfile = () => {
    const newProfile = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      skills: this.state.skills,
      bio: this.state.bio,
      githubUsername: this.state.githubUsername,
      youtube: this.state.youtube,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      instagram: this.state.instagram,
      status: this.state.status
    }
    console.log(newProfile)
  }


  render() {

    return (
      <div>
        {
          (localStorage.token) ? <LoginNavbar /> : ""
        }
        <div className="create-profile">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <Link to='/dashboard' className="btn btn-light">
                  Go Back
                </Link>
                <h1 className="display-4 text-center mb-5">Edit Your Profile</h1>
                <form>
                  <div className="form-group">
                    <input type="text" className="form-control form-control-lg" placeholder="* Profile handle" name="handle" value={this.state.handle} onChange={this.onChange}
                    />

                  </div>
                  <div className="form-group">
                    <select className="form-control form-control-lg" onChange={this.onChange} name="status" value={this.state.status}>
                      <option value="0">* Select Professional Status</option>
                      <option value="Developer">Developer</option>
                      <option value="Junior Developer">Junior Developer</option>
                      <option value="Senior Developer">Senior Developer</option>
                      <option value="Manager">Manager</option>
                      <option value="Student or Learning">Student or Learning</option>
                      <option value="Instructor">Instructor or Teacher</option>
                      <option value="Intern">Intern</option>
                      <option value="Other">Other</option>
                    </select>

                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control form-control-lg" placeholder="Company Name" name="company" value={this.state.company} onChange={this.onChange} />

                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control form-control-lg" placeholder="Your Website" name="website" value={this.state.website} onChange={this.onChange}
                    />

                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control form-control-lg" placeholder="Your Location" name="location" value={this.state.location} onChange={this.onChange} />

                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control form-control-lg" placeholder="Skills" name="skills" value={this.state.skills} onChange={this.onChange} />

                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control form-control-lg" placeholder="Github Username" name="githubusername" value={this.state.githubUsername} onChange={this.onChange}
                    />

                  </div>
                  <div className="form-group">
                    <textarea className="form-control form-control-lg" placeholder="A short bio of yourself" name="bio" value={this.state.bio} onChange={this.onChange}></textarea>

                  </div>

                  <div className="mb-3">
                    <button type="button" className="btn btn-light">Add Social Network Links</button>
                    <span className="text-muted">Optional</span>
                  </div>

                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fab fa-twitter"></i>
                      </span>
                    </div>
                    <input type="text" className="form-control form-control-lg" placeholder="Twitter Profile URL" name="twitter" value={this.state.twitter} onChange={this.onChange}
                    />
                  </div>

                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fab fa-facebook"></i>
                      </span>
                    </div>
                    <input type="text" className="form-control form-control-lg" placeholder="Facebook Page URL" name="facebook" value={this.state.facebook} onChange={this.onChange} />
                  </div>

                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fab fa-linkedin"></i>
                      </span>
                    </div>
                    <input type="text" className="form-control form-control-lg" placeholder="Linkedin Profile URL" name="linkedin" value={this.state.linkedin} onChange={this.onChange} />
                  </div>

                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fab fa-youtube"></i>
                      </span>
                    </div>
                    <input type="text" className="form-control form-control-lg" placeholder="YouTube Channel URL" name="youtube" value={this.state.youtube} onChange={this.onChange} />
                  </div>

                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fab fa-instagram"></i>
                      </span>
                    </div>
                    <input type="text" className="form-control form-control-lg" placeholder="Instagram Page URL" name="instagram" value={this.state.instagram} onChange={this.onChange} />
                  </div>
                  <input type="submit" className="btn btn-info btn-block mt-4 mb-5" />
                </form>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default EditProfile;