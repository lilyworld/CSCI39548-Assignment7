import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './Login';
import Debits from './components/Debits';
import Credits from './components/Credits';
import axios from 'axios';

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

  async componentDidMount() {
    let credits = await axios.get("https://moj-api.herokuapp.com/credits")
    credits = credits.data
    credits.forEach((credit) => {
        this.CredSum(credit.amount)
    })
    let debits = await axios.get("https://moj-api.herokuapp.com/debits");
    debits = debits.data
    debits.forEach((debit) => {
      this.DebSum(debit.amount)
    })
      this.setState({ debits, credits, accountBalance:this.state.debitBalance-this.state.creditBalance});
  }

  mockLogIn = (logInInfo) => {
    const newUser = {...this.state.currentUser}
    newUser.userName = logInInfo.userName
    this.setState({currentUser: newUser})
  }

  CredSum = (sum) => {
    this.setState({creditBalance:this.state.creditBalance+parseInt(sum)},()=>this.setState({accountBalance:this.state.debitBalance-this.state.creditBalance}))
  }

  DebSum = (sum) => {
    this.setState({debitBalance:this.state.debitBalance+parseInt(sum)},()=>this.setState({accountBalance:this.state.debitBalance-this.state.creditBalance}))
  }

  addNewCred = (newCred) => {
    let credUpdate = this.state.credits
    credUpdate.push(newCred)
    this.setState({credits: credUpdate})
  }

  addNewDeb = (newDeb) => {
    let debUpdate = this.state.debits
    debUpdate.push(newDeb)
    this.setState({debits: debUpdate})
  }

  render() {
    const HomeComponent = () => (<Home creditBalance={this.state.creditBalance} debitBalance={this.state.debitBalance} accountBalance={this.state.accountBalance} debitBalance={this.state.debitBalance} accountBalance={this.state.accountBalance}/>);
    const UserProfileComponent = () => (
        <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince}  />
    );
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)
    const DebitsComponent = () => (<Debits addDeb={this.addNewDeb} debits={this.state.debits} DebSum={this.DebSum} creditBalance={this.state.creditBalance} debitBalance={this.state.debitBalance} accountBalance={this.state.accountBalance}/>)
    const CreditsComponent = () => (<Credits addCredit={this.addNewCred} credits={this.state.credits} CredSum={this.CredSum} creditBalance={this.state.creditBalance} debitBalance={this.state.debitBalance} accountBalance={this.state.accountBalance}/>)

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