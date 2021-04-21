import React, { Component } from 'react'
import axios from 'axios';
import AccountBalance from "./AccountBalance";
import { Redirect } from 'react-router-dom'

class Debits extends Component {

    constructor(props) {
        super(props)
        this.state =
        {
            debitSum: 0,
            description: "",
            amount: null,
            date: "",
            debits: [], //creates an array to hold debit info
        }
    }

    //function for what happens when you input the description
    handleDescription = (event) => {
        this.setState({ description: event.target.value });
    }
    handleAmount = (event) => {
        this.setState({ amount: event.target.value });
    }

    componentDidMount = async () => {
        let debits = await axios.get("https://moj-api.herokuapp.com/debits");
        debits = debits.data
        let sum = 0;
        debits.forEach((debit) => {
            sum += debit.amount
        })
        this.setState({ debits, debitSum: sum });
    }

    makeTable = (debits) => {
        let table = [];
        console.log("entered table");
        console.log(debits);
        for (let i = 0; i < debits.length; i++) {
            table.push(
                <tbody>
                    <tr key={debits[i].id}>
                        <td>
                            <ul>
                                <td><b>{debits[i].description}</b></td>
                                <p>Amount: ${debits[i].amount}</p>
                                <p>Date: {debits[i].date}</p>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            );
        }
        return table;
    }

    addDebit = (event) => {
        event.preventDefault();
        const debitInfo = this.state.debits;
        const Balance = this.props.accountBalance - parseInt(this.state.amount);
        const date = new Date().toLocaleDateString("en-US");
        this.setState({ date });

        debitInfo.unshift({ description: this.state.description, amount: this.state.amount, date });

        this.setState({ debits: debitInfo });

    }
    render() {
        const { debits } = this.state;
        console.log(debits);
        return (
            <div>
                <h1>Debits</h1>
                <AccountBalance accountBalance={this.props.accountBalance} />
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