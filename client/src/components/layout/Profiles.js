import React, { Component } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Link } from 'react-router-dom'
import Axios from 'axios'

class Profiles extends Component {
  constructor() { 
    super();
    this.state = {
      userData: []
    }
  }

  //fetch all profiles 
  componentDidMount() {
    Axios.get('/api/profile/all')
      .then(profile => this.setState({
        userData: profile.data
      }))
  }



  render() {
    console.log(this.state.userData, 'data')
    return (
      <div>
        <Navbar />
        <div className="profiles profile-div">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 className="display-4 text-center">Developer Profiles</h1>
                <p className="lead text-center">Browse and connect with developers</p>
                {/* map all the devs profile */}
                {this.state.userData.map(dev => {
                  return <div className="card card-body bg-light mb-3">
                    <div className="row">
                      <div className="col-2">
                        <img className="rounded-circle" src={dev.user.avatar} alt="" />
                      </div>
                      <div className="col-lg-6 col-md-4 col-8">
                        <h3>{dev.user.name}</h3>
                        <p>{dev.company}</p>
                        <p>{dev.location}</p>
                        <Link to='/user-profile' className="btn btn-info">View Profile</Link>
                      </div>
                      <div className="col-md-4 d-none d-lg-block">
                        <h4>Skill Set</h4>
                        <ul className="list-group">
                          {dev.skills.map(skill => {
                            return <li className="list-group-item">
                              <i className="fa fa-check pr-1"></i>{skill}</li>
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                })}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>

    )
  }
}

export default Profiles;
