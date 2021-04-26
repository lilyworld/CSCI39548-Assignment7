import React, {Component} from 'react';
import AccountBalance from './AccountBalance';
import {Link} from 'react-router-dom';

class Home extends Component {
  render() {
    return (
        <div>
          <img src="https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmFua3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80" alt="bank" height="200px"/>
          <h1>Bank of React</h1>

          <p><Link to="/userProfile">User Profile</Link> <Link to="/credits">Credits</Link> <Link to="/debits">Debits</Link></p>

          <AccountBalance accountBalance={this.props.accountBalance} debitBalance={this.props.debitBalance} creditBalance={this.props.creditBalance}/>
        </div>
    );
  }
}

export default Home;