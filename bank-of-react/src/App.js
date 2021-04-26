import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './Login';
import Debits from './components/Debits';
import Credits from './components/Credits';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      accountBalance: 0,
      creditBalance: 0,
      debitBalance: 0,
      currentUser: {
        userName: 'joe_shimo',
        memberSince: '07/23/96',
      },
      debits: [],
      credits: [],
    }
  }

  mockLogIn = (logInInfo) => {
    const newUser = {...this.state.currentUser}
    newUser.userName = logInInfo.userName
    this.setState({currentUser: newUser})
  }

  render() {
    const HomeComponent = () => (<Home creditSum={this.state.creditSum} debitSum={this.state.debitSum} accountBalance={this.state.accountBalance}/>);
    const UserProfileComponent = () => (
        <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince}  />
    );
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)
    const DebitsComponent = () => (<Debits creditBalance={this.state.creditBalance} debitBalance={this.state.debitBalance} accountBalance={this.state.accountBalance}/>)
    const CreditsComponent = () => (<Credits creditBalance={this.state.creditBalance} debitBalance={this.state.debitBalance} accountBalance={this.state.accountBalance}/>)

    return (
        <Router>
          <div>
            <Route exact path="/" render={HomeComponent}/>
            <Route exact path="/userProfile" render={UserProfileComponent}/>
            <Route exact path="/login" render={LogInComponent}/>
            <Route exact path="/debits" render={DebitsComponent}/>
            <Route exact path="/credits" render={CreditsComponent}/>
          </div>
        </Router>
    );
  }

}

export default App;