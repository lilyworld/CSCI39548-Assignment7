import React, {Component} from 'react';

class AccountBalance extends Component {
  // balance = () => {
  //   let sum = this.props.debitSum - this.props.creditSum
  //   console.log(this.props.debitSum)
  //   console.log(this.props.creditSum)
  //   this.setState({accountBalance: sum})
  // }

  render() {
    return (
        <div>
          <p>Account Balance: {this.props.accountBalance}</p>
          <p>Credit Balance: {this.props.creditSum}</p>
        </div>
    );
  }
}

export default AccountBalance;