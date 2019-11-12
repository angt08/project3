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
import GiftListDetails from './components/GiftListDetails';
import CreateGiftListForm from './components/CreateGiftListForm';
import { registerUser, loginUser, verifyUser, getGiftListsByUser } from './services/api-helper';

class App extends React.Component {
  state = {
    currentUser: null,
    authErrorMessage: "",
    giftLists: []
  }
  handleLogin = async (loginData) => {
    const currentUser = await loginUser(loginData);
    if (currentUser.error) {
      this.setState({ authErrorMessage: currentUser.error });
    }
    else {
      this.setState({ currentUser });
      await this.getGiftLists();
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
    this.setState({
      currentUser: null,
      authErrorMessage: "",
      giftLists: []
    });
  }
  handleVerify = async () => {
    const currentUser = await verifyUser();
    if (currentUser)
      this.setState({ currentUser });
  }
  getGiftLists = async () => {
    if (this.state.currentUser) {
      const giftLists = await getGiftListsByUser(this.state.currentUser.id);
      this.setState({ giftLists })
    }
    else {
      this.setState({ giftLists: [] })
    }
  }
  componentDidMount = async () => {
    console.log("component did mount ran.");
    await this.handleVerify();
    await this.getGiftLists();
  }

  render() {
    const { currentUser } = this.state;
    return (
      <div className="app" >
        <Header
          currentUser={currentUser}
          handleLogout={this.handleLogout}
        />
        <Route exact path="/" render={() => (
          <Home
            giftLists={this.state.giftLists}
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
        <Route exact path='/giftLists/:id' render={(props) => {
          const id = props.match.params.id;
          const currentGiftList = this.state.giftLists.find(gl => {
            return gl.id === parseInt(id)
          })
          return <GiftListDetails
            currentGiftList={currentGiftList}
          />
        }} />
        <Route path='/giftLists/new' render={() => (
          <CreateGiftListForm
          />
        )} />
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
