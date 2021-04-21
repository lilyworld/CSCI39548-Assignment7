import React, {Component} from 'react';

class AccountBalance extends Component {
  render() {
    return (
        <div>
          Account Balance: {this.props.accountBalance}
        </div>
    );
  }
}

export default AccountBalance;