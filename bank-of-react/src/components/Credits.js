import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios';
import AccountBalance from './AccountBalance';
import {Link} from 'react-router-dom';

class Credits extends Component {
    constructor(props) {
        super(props);
        this.state = {
            credits: [],
            // description: "",
            // amount: 0,
            // date: "",
        }
    }

    handleDescription = (event) => {
        this.setState({ description: event.target.value });
    }
    handleAmount = (event) => {
        this.setState({ amount: event.target.value });
    }

    async componentDidMount() {
        let credits = await axios.get("https://moj-api.herokuapp.com/credits")

        credits = credits.data
        let sum = 0;
        credits.forEach((credit) => {
            sum += credit.amount
        })

        this.setState({credits});
    }

    makeTable = (credits) => {
        let table = [];
        console.log("entered table");
        console.log(credits);
        for (let i = 0; i < credits.length; i++) {
            table.push(
                <tbody>
                    <tr key={credits[i].id}>
                        <td>
                            <ul>
                                <td><b>{credits[i].description}</b></td>
                                <p>Amount: ${credits[i].amount}</p>
                                <p>Date: {credits[i].date}</p>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            );
        }
        return table;
    }

    addCredit = (event) => {
        event.preventDefault();
        const creditInfo = this.state.credits;
        const Balance = this.props.accountBalance - parseInt(this.state.amount);

        const date = new Date().toLocaleDateString("en-US");
        this.setState({ date });

        creditInfo.unshift({ description: this.state.description, amount: this.state.amount, date });

        this.setState({ credits: creditInfo });
    }

    render() {
        const {credits} = this.state;
        console.log(credits);
        return (
            <div>
                <div className="App-header">
                    <p><Link to="/userProfile">User Profile</Link> <p><Link to="/debits">Debits</Link></p></p> 
                    <h1>Credits</h1>
                    <AccountBalance accountBalance={this.props.accountBalance}/>
                    <form>
                        <input type="text" value={this.state.description} onChange={this.handleDescription} placeholder="Enter Description"></input>
                        <input type="number" value={this.state.amount} onChange={this.handleAmount} placeholder="Enter Amount"></input>
                        <button className="add-credit" onClick={this.addCredit}>Add Credit</button>
                    </form>
                </div>
                <br/>
                <table id="data">
                    <tbody>
                        {this.makeTable(credits)}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Credits