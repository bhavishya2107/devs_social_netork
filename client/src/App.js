import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Profiles from "./components/layout/Profiles";
import Dashboard from "./components/layout/Dashboard";
import AddExperience from "./components/layout/AddExperience";
import AddEducation from "./components/layout/AddEducation";
import EditProfile from "./components/layout/EditProfile";
import UserProfile from "./components/layout/UserProfile";
import Comment from "./components/layout/Comment";
import Post from "./components/layout/Post";
import axios from "axios";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUserData: null,
      userProfile: null,
      post: null
    };
  }

  componentDidMount() {
    axios
      .get("/api/users/current", {
        headers: {
          Authorization: localStorage.token,
          "Content-Type": "application/json"
        }
      })
      .then(current =>
        this.setState({
          currentUserData: current.data
        })
      )
      .catch(err => {
        console.log(err);
      });
  }

  getUserProfile = id => {
    axios
      .get(`/api/profile/${id}`, {
        headers: {
          Authorization: localStorage.token,
          "Content-Type": "application/json"
        }
      })
      .then(profile =>
        this.setState({
          userProfile: profile.data
        })
      );
  };

  getCommentById = id => {
    axios
      .get(`/api/posts/${id}`, {
        headers: {
          Authorization: localStorage.token,
          "Content-Type": "application/json"
        }
      })
      .then(userPost =>
        this.setState({
          post: userPost
        })
      );
  };

  render() {
    console.log(this.state && this.state.post);
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/profiles">
              <Profiles getUserData={this.getUserProfile} />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/add-experience">
              <AddExperience />
            </Route>
            <Route path="/add-education">
              <AddEducation />
            </Route>
            <Route path="/edit-profile">
              <EditProfile user={this.state.currentUserData} />
            </Route>
            <Route path="/user-profile">
              <UserProfile userData={this.state.userProfile} />
            </Route>
            <Route path="/post">
              <Post
                currentUser={this.state.currentUserData}
                getCommentById={this.getCommentById}
              />
            </Route>
            <Route path="/comment">
              <Comment post={this.state.post} />
            </Route>
            <Route path="/">
              <Landing />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
