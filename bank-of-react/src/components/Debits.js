import React, { Component } from 'react'
import axios from 'axios';
import AccountBalance from "./AccountBalance";
import { Link } from 'react-router-dom'

class Debits extends Component {

    constructor(props) {
        super(props)
        this.state =
        {
            description: "",
            amount: null,
            date: "",
            debits: [], //creates an array to hold debit info
        }
    }

    componentDidMount = async () => {
        let ApiResponse = await axios.get("https://moj-api.herokuapp.com/debits");
        try {
            this.setState({ userData: ApiResponse.data })
        }
        catch (error) {
            if (error.response) {
                console.log("Error Data: ", error.ApiResponse.data); //Not found
                console.log("Error Status: ", error.ApiResponse.status); //404
            }
        }
    }

    handleAmount = (event) => {
        if (isNaN(event.target.value)) {
            alert("Please enter a number")
        }
        else {
            this.setState({ amount: event.target.value });
        }
    }

    addDebit = (event) => {
        const debitInfo = this.state.debits;
        const Balance = this.props.accountBalance - parseInt(this.state.amount);
        this.props.updateBalance(Balance);

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