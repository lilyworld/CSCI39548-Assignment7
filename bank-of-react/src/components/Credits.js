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
            items: []
        }
    }

    handleDescription = (event) => {
        this.setState({ description: event.target.value });
    }
    handleAmount = (event) => {
        this.setState({ amount: event.target.value });
    }

    async componentDidMount() {
        this.setState({credits: this.props.credits});

        let items = await axios.get("https://moj-api.herokuapp.com/credits");
        items = items.data
    }

    makeTable = (items) => {
        let table = [];
        console.log("entered table");
        console.log(items);
        for (let i = 0; i < items.length; i++) {
            table.push(
                <tbody>
                    <tr key={items[i].id}>
                        <td>
                            <ul>
                                <td><b>{items[i].description}</b></td>
                                <p>Amount: ${items[i].amount}</p>
                                <p>Date: {items[i].date}</p>
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

        const date = new Date().toLocaleDateString("en-US");
        this.setState({ date });

        let newCred = {
            description: this.state.description,
            amount: this.state.amount,
            date
        }

        creditInfo.unshift({ description: this.state.description, amount: this.state.amount, date });
        this.props.testCredSum(this.state.amount);
        this.props.addCredit(newCred);
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
                    <AccountBalance accountBalance={this.props.accountBalance} creditBalance={this.props.creditBalance} debitBalance={this.props.debitBalance}/>
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