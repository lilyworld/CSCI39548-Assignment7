import React, { Component } from 'react'
import axios from 'axios';
import AccountBalance from "./AccountBalance";
import { Redirect } from 'react-router-dom'
import {Link} from 'react-router-dom';

class Debits extends Component {

    constructor(props) {
        super(props)
        this.state =
        {
            debits: [],
            items: []
        }
    }

    //function for what happens when you input the description
    handleDescription = (event) => {
        this.setState({ description: event.target.value });
    }
    handleAmount = (event) => {
        this.setState({ amount: event.target.value });
    }

    async componentDidMount() {
        this.setState({debits: this.props.debits});

        let items = await axios.get("https://moj-api.herokuapp.com/debits");
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

    addDebit = (event) => {
        event.preventDefault();
        const debitInfo = this.state.debits;
        const date = new Date().toLocaleDateString("en-US");
        this.setState({ date });

        let newDeb = {
            description: this.state.description,
            amount: this.state.amount,
            date
        }

        debitInfo.unshift({ description: this.state.description, amount: this.state.amount, date });
        this.props.DebSum(this.state.amount);
        this.props.addDeb(newDeb);
        this.setState({ debits: debitInfo });
    }

    render() {
        const { debits } = this.state;
        console.log(debits);
        return (
            <div>
                <p><Link to="/userProfile">User Profile</Link> <Link to="/credits">Credits</Link></p>
                <h1>Debits</h1>
                <AccountBalance accountBalance={this.props.accountBalance}  creditBalance={this.props.creditBalance} debitBalance={this.props.debitBalance}/>
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