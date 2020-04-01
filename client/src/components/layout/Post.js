import React, { Component } from 'react'
import LoginNavbar from './LoginNavbar'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'
import Footer from './Footer'
import { ToastContainer, toast } from "react-toastify"
import axios from 'axios'

class Post extends Component {
  constructor() {
    super()
    this.state = {
      text: null,
      post: null,
      allPost: null
    }
  }


  //comment post
  commentPost = (e) => {
    e.preventDefault()
    axios.post('/api/posts', {
      text: this.state.text
    }, {
      headers: {
        "Authorization": localStorage.token,
        "Content-Type": "application/json"
      }
    })
      .then(post => this.setState({
        post: post
      }))
      .then(getPost => this.getPost())
  }

  //delete post
  deletePost = (id, userid) => {
    if (localStorage.id === userid) {
      axios.delete(`/api/posts/${id}`, {
        headers: {
          "Authorization": localStorage.token,
          "Content-Type": "application/json"
        }
      })
        // .then(post => this.getPost())
        .then(post => console.log(post))
    } else {
      toast.info("You are not authorized ", {
        position: toast.POSITION.TOP_RIGHT
      })
    }
  }

  getPost = () => {
    axios.get('/api/posts')
      .then(post => console.log(post))
  }

  componentDidMount() {
    axios.get(`/api/posts`)
      .then(all => this.setState({
        allPost: all
      }))
  }
  

  render() {
    console.log(this.state.allPost && this.state.allPost.data)
    return (
      <div>
        {(localStorage.token) ? <LoginNavbar /> : <Navbar />}
        <div className="feed" style={{ "minHeight": "100vh" }}>
          <div className="container">
            <div className="row">
              <div className="col-md-12">

                <div className="post-form mb-3">
                  <div className="card card-info">
                    <div className="card-header bg-info text-white">
                      Say Somthing...
                </div>
                    <div className="card-body">
                      <form onSubmit={this.commentPost}>
                        <div className="form-group">
                          <textarea className="form-control form-control-lg" placeholder="Create a post" value={this.state.text} onChange={(e) => {
                            this.setState({
                              text: e.target.value
                            })
                          }}></textarea>
                        </div>
                        <button type="submit" className="btn btn-dark">Submit</button>
                      </form>
                    </div>
                  </div>
                </div>
                {this.state.allPost && this.state.allPost.data ? this.state.allPost && this.state.allPost.data.post.map((post => {
                  return <div className="posts">
                    <div className="card card-body mb-3">
                      <div className="row">
                        <div className="col-md-2">
                          <img className="rounded-circle d-none d-md-block" src={post.user.avatar}
                            alt="" />
                          <br />
                          <p className="text-center">{post.name}</p>

                        </div>
                        <div className="col-md-10">
                          <p className="lead">{post.text}</p>
                          <button type="button" className="btn btn-light mr-1">
                            <i className="text-info fas fa-thumbs-up"></i>
                            <span className="badge badge-light">4</span>
                          </button>
                          <button type="button" className="btn btn-light mr-1">
                            <i className="text-secondary fas fa-thumbs-down"></i>
                          </button>
                          <Link to="/comment" className="btn btn-info mr-1" onClick={() => this.props.getCommentById(post._id)}>
                            Comments
                          </Link>

                          <button type="button" className="btn btn-danger mr-1" onClick={() => this.deletePost(post._id, post.user._id)} >
                            <i className="fas fa-times" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                })) : "No post at present"}
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

export default Post
