import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class Debits extends Component {
    render() {
        return (
            <div>
                <h1>Debits</h1>
                <AccountBalance accountBalance={this.props.accountBalance}  creditBalance={this.props.creditBalance} debitBalance={this.props.debitBalance}/>
                <p>Debit Balance: {this.state.debitSum}</p>

                <br />
                <form>
                    <input type="text" value={this.state.description} onChange={this.handleDescription} placeholder="Enter Description"></input>
                    <input type="number" value={this.state.amount} onChange={this.handleAmount} placeholder="Enter Amount"></input>
                    <button className="add-debit" onClick={this.addDebit}>Add Debit</button>
                </form>
                <br />
                <table id="data">
                    <tbody>
                        {this.makeTable(debits)}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Debits