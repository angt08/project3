import React from 'react';
import './App.css';
import { getData } from './services/api-helper';
import Header from './components/Header';
import Footer from './components/Footer';
import { Route, withRouter } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import { registerUser, loginUser, verifyUser } from './services/api-helper';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      something: [],

    }
  }
  state = {
    currentUser: null,
    authErrorMessage: ""
  }
  handleLogin = async (loginData) => {
    const currentUser = await loginUser(loginData);
    if (currentUser.error) {
      this.setState({ authErrorMessage: currentUser.error });
    }
    else {
      this.setState({ currentUser });
      this.props.history.push('./');
    }
  }
  handleRegister = async (registerData) => {
    const currentUser = await registerUser(registerData);
    if (currentUser.error) {
      this.setState({ authErrorMessage: currentUser.error });
    }
    else {
      this.setState({ currentUser });
      this.props.history.push('./');
    }
  }
  handleLogout = () => {
    this.setState({ currentUser: null });
    localStorage.removeItem('authToken');
  }
  handleVerify = async () => {
    const currentUser = await verifyUser();
    if (currentUser)
      this.setState({ currentUser });
  }
  componentDidMount = () => {
    this.handleVerify();
  }

  render() {
    const { currentUser } = this.state;
    return (
      <div className="app" >
        <Header
          currentUser={currentUser} />
        <Route exact path="/" render={() => (
          <Home
            currentUser={currentUser}
            handleLogout={this.handleLogout}
          />)} />
        <Route path="/about" render={() => (<About />)} />
        <Route path="/login" render={() => (
          <LoginForm
            handleLogin={this.handleLogin}
            authErrorMessage={this.state.authErrorMessage}
          />
        )} />
        <Route path="/register" render={() => (
          <RegisterForm
            handleRegister={this.handleRegister}
            authErrorMessage={this.state.authErrorMessage}
          />
        )} />
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
