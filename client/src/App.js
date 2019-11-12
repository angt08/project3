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
import { registerUser, loginUser, verifyUser, getGiftListsByUser, postGiftList } from './services/api-helper';

class App extends React.Component {
  state = {
    currentUser: null,
    authErrorMessage: "",
    giftLists: [],
    giftListFormData: {
      title: "",
      description: "",
      image_link: "",
      due_date: ""
    }
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
  getGiftLists = async () => {
    if (this.state.currentUser) {
      const giftLists = await getGiftListsByUser(this.state.currentUser.id);
      this.setState({ giftLists })
      console.log(`GiftLists=${giftLists}`);
    }
    else {
      this.setState({ giftLists: [] })
    }
  }
  ///////Handle Change /////////
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      giftListFormData: {
        ...prevState.giftListFormData,
        [name]: value
      }
    }))
  }
  ///////////////////////////

  /// Create Gift List /////////////
  createGiftList = async (userId) => {
    await postGiftList(userId, this.state.giftListFormData);
    this.props.history.push('./')
    // this.props.history.push(`/users/${userId}/giftlists/`)
  }
  /////////////////////////////////

  componentDidMount = async () => {
    await this.handleVerify();
    await this.getGiftLists();
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
        <Route path='/create_giftLists' render={() => (
          <CreateGiftListForm
            createGiftList={this.createGiftList}
            handleChange={this.handleChange}
            currentUser={currentUser}
            giftListFormData={this.state.giftListFormData}
          />
        )} />
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
