import React, { Component } from "react";
import LoginNavbar from "./LoginNavbar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

export default class AddEducation extends Component {
  constructor() {
    super();
    this.state = {
      school: null,
      degree: null,
      fieldofstudy: null,
      from: null,
      to: null,
      current: false,
      description: null
    };
  }

  addEducationToProfile = e => {
    e.preventDefault();
    const newEdu = {
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };
    axios
      .post("/api/profile/education", newEdu, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.token
        }
      })
      .then(addEdu => {
        if (addEdu.data) {
          toast.success("Education Added ", {
            position: toast.POSITION.TOP_RIGHT
          });
        } else {
          return null;
        }
      })
      .then(a => (window.location.href = "/dashboard"))
      .catch(err =>
        toast.error("Education Not Added ", {
          position: toast.POSITION.TOP_RIGHT
        })
      );
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        {localStorage.token ? <LoginNavbar /> : ""}
        <div className="add-education">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <Link to="/dashboard" className="btn btn-light">
                  Go Back
                </Link>
                <h1 className="display-4 text-center mb-5">
                  Add Your Education
                </h1>
                <form onSubmit={this.addEducationToProfile}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="* School Or Bootcamp"
                      name="school"
                      value={this.state.school}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="* Degree Or Certificate"
                      name="degree"
                      value={this.state.degree}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Field Of Study"
                      name="fieldofstudy"
                      value={this.state.fieldofstudy}
                      onChange={this.onChange}
                    />
                  </div>
                  <h6>From Date</h6>
                  <div className="form-group">
                    <input
                      type="date"
                      className="form-control form-control-lg"
                      name="from"
                      value={this.state.from}
                      onChange={this.onChange}
                    />
                  </div>
                  <h6>To Date</h6>
                  <div className="form-group">
                    <input
                      type="date"
                      className="form-control form-control-lg"
                      name="to"
                      value={this.state.to}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-check mb-4">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="current"
                      value=""
                      id="current"
                      checked={this.state.current}
                      onClick={() => {
                        this.setState({
                          current: !this.state.current
                        });
                      }}
                    />
                    <label className="form-check-label" for="current">
                      Current Job
                    </label>
                  </div>
                  <div className="form-group">
                    <textarea
                      className="form-control form-control-lg"
                      placeholder="Program Description"
                      name="description"
                      value={this.state.description}
                      onChange={this.onChange}
                    ></textarea>
                    <small className="form-text text-muted">
                      Tell us about your experience and what you learned
                    </small>
                  </div>
                  <input
                    type="submit"
                    className="btn btn-info btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  }
}
