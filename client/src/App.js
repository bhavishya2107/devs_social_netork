import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
// import Navbar from './components/layout/Navbar';
// import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/register'>
            <Register />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/'>
            <Landing />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
