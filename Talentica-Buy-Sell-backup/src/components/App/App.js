import React, { Component } from 'react';
import './App.css';
import Talentica from '../../assets/Talentica.png';
import { fakeAuth } from '../../index.js';
import { Redirect } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleInputsChange = this.handleInputsChange.bind(this);
    this.state = {
      username: '',
      password: '',
      role: '',
      redirectToReferrer: false
    }
  }

  handleInputsChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleLogin = () => {
    if (this.state.username === 'pa' && this.state.password === 'egain123') {
      if (this.state.role === 'buyer') {
        this.props.history.push("/buyer");
      } else {
        this.props.history.push("/seller");
      }
      fakeAuth.authenticate(() => {
        this.setState({
          redirectToReferrer: true
        });
      })
    } else {
      alert('Login failed!');
    }
    this.setState({
      username: '',
      password: '',
      role: ''
    })
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem('Username', JSON.stringify(nextState.username));
    localStorage.setItem('Role', JSON.stringify(nextState.role));
  }

  render() {
    const { redirectToReferrer, role, username, password } = this.state;
    if (redirectToReferrer === true) {
      if (role === 'buyer') {
        return (
          <Redirect to="/buyer" />
        );
      }
      else {
        return (
          <Redirect to="/seller" />
        );
      }
    }

    return (
      <div className="app-text-align">
        <div>
          <img src={Talentica} alt="Talentica icon" />
        </div>
        <br />
        <div>
          <div>
            <label>Username: </label>
            <input
              name="username"
              id="username"
              type="text"
              placeholder="Enter username"
              onChange={this.handleInputsChange}
              value={username}
            >
            </input>
          </div>
          <br />
          <div>
            <label>Password: </label>
            <input
              name="password"
              id="password"
              type="password"
              placeholder="Enter password"
              onChange={this.handleInputsChange}
              value={password}
            >
            </input>
          </div>
          <br />
          <div>
            <label>Login as: </label>
            <select
              required
              name="role"
              id="role"
              onChange={this.handleInputsChange}
              value={role}
            >
              <option value="" hidden>Select role</option>
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
          </div>
          <br />
          <button
            type="submit"
            onClick={this.handleLogin}
            disabled={username === '' || password === '' || role === ''}
          >
            Login
          </button>
          {username === 'pa' && password === 'egain123' && role !== '' &&
            <p>Valid credentials!</p>
          }
        </div>
      </div>
    );
  }
}

export default App;