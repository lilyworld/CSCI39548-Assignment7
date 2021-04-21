import React, { Component } from 'react'
import axios from 'axios';
import AccountBalance from "./AccountBalance";
import { Link } from 'react-router-dom'

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

    componentDidMount = async () => {
        let debits = await axios.get("https://moj-api.herokuapp.com/debits");
        debits = debits.data
        let sum = 0;
        debits.forEach((debit)=>{
            sum += debit.amount
        })
        this.setState({debits, debitSum: sum});
    }

    handleAmount = (event) => {
        if (isNaN(event.target.value)) {
            alert("Please enter a number")
        }
        else {
            this.setState({ amount: event.target.value });
        }
    }

    makeTable = (debits) =>{
        let table = [];
        console.log("entered table");
        console.log(debits);
        for(let i = 0; i < debits.length; i++)
        {
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
        const debitInfo = this.state.debits;
        const Balance = this.props.accountBalance - parseInt(this.state.amount);

        const date = new Date().toLocaleDateString("en-US");
        this.setState({ date });

        debitInfo.unshift({ description: this.state.description, amount: this.state.amount, date });

        this.setState({ debits: debitInfo });

    }
    render() {

        return (
            <div>
                <h1>Debits</h1>
                <AccountBalance accountBalance={this.props.accountBalance} />
                <br />
                <form onClick={this.addDebit}>
                    <input value={this.state.description} onChange={this.handleDescription} placeholder="Enter Description"></input>
                    <input value={this.state.amount} onChange={this.handleAmount} placeholder="Enter Amount"></input>
                    <button>Add Debit</button>
                </form>
                <br />
                {this.state.debits.map((data) => {
                    return (
                        <div>
                            <p>{data.description}</p>
                            <p>{data.amount}</p>
                            <p>{data.date}</p>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default Debits