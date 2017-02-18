import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import ListItem from './listItem';

class SampleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            limit: this.props.limit,
            listItems: [],
            loading: false,
            adding: false,
            adder: null
        }
        this._handleChange = this._handleChange.bind(this);
        this._updateListItems = this._updateListItems.bind(this);
        this._addOnePerSecond = this._addOnePerSecond.bind(this);
        this._stopAdding = this._stopAdding.bind(this);
        this._removeItem = this._removeItem.bind(this);
    }
    _handleChange(event) {
        this.setState({ limit: event.target.value });
    }
    _updateListItems() {
        const limit = this.state.limit;
        const url = `/sample/${limit}`;
        this.setState({ loading: true },
            () => {
                fetch(url)
                    .then((response) => {
                        if (response.status !== 200) {
                            alert("no worky");
                        }
                        return response.json();
                    })
                    .then((json) => {
                        this.setState({
                            listItems: json,
                            loading: false
                        });
                    });
            });
    }
    _addOnePerSecond() {
        console.log("starting adding one per second");
        this.setState({
            adding: true
        }, () => {
            this.setState({
                adder: window.setInterval(() => {
                    fetch(`/sample/1`)
                        .then((response) => {
                            console.log("got one");
                            return response.json();
                        })
                        .then((json) => {
                            console.log(json);
                            this.setState({
                                listItems: [...this.state.listItems, json[0]]
                            });
                        })
                        .then(() => {
                            console.log(this.state);
                        });;
                }, 1000)    
            });
        });
    }
    _stopAdding() {
        this.setState({
                adding: false
            },
            () => {
                window.clearInterval(this.state.adder);
                this.setState({
                    adder: null
                });
            });
    }
    _removeItem(item) {
        this.setState({
            listItems: this.state.listItems.filter((li) => {
                return li.text !== item.text;
            })
        });
    }
    componentDidMount() {
        this._updateListItems();
    }
    render() {
        return (
            <div className="mdl-cell mdl-cell--12-col">
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input type="number" value={this.state.limit} onChange={this._handleChange} className="mdl-textfield__input" id="count" />
                    <label className="mdl-textfield__label" htmlFor="count">Items</label>
                </div>
                &nbsp;
                <button type="button" onClick={this._updateListItems} className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
                    <i className="material-icons">autorenew</i>
                    Update
                </button>
                &nbsp;
                <button type="button" onClick={this._addOnePerSecond} className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
                    <i className="material-icons">exposure_plus_1</i>
                    Add one per second
                </button>
                &nbsp;
                {this.state.adding
                    ? (
                        <button type="button" onClick={this._stopAdding} className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent">
                            <i className="material-icons">stop</i>
                            Stop
                        </button>)
                    : (null)}
                <div className="mdl-cell mdl-cell--12-col">
                    Showing {this.state.listItems.length} items:
                </div>
                {this.state.loading ? ("loading") : (
                    <ol>
                        {this.state.listItems.map((li) => {
                            return (
                                <ListItem {...li} key={li.text} removeItem={() => this._removeItem(li)} />
                            );
                        })}
                    </ol>    
                )}
            </div>
        );
    }
}

SampleList.defaultProps = {
    limit: 10
}

export default SampleList;