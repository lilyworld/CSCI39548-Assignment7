import React, {Component} from 'react';

class AccountBalance extends Component {
  render() {
    return (
        <div>
          <p>Account Balance: ${this.props.accountBalance}</p>
          <p>Debit Balance: ${this.props.debitBalance}</p>
          <p>Credit Balance: ${this.props.creditBalance}</p>
        </div>
    );
  }
}

export default AccountBalance;