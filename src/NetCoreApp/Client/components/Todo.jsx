import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';

class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todo: [],
            newItemText: ""
        }
        this._getTodoList = this._getTodoList.bind(this);
        this._toggleItem = this._toggleItem.bind(this);
        this._addListItem = this._addListItem.bind(this);
        
    }
    _getTodoList() {
        const url = "/sample/todo";
        fetch(url)
            .then((response) => {
                if (response.status !== 200) {
                    const error = `Error getting todo list: ${response.status}`;
                    alert(error);
                    return null;
                } else {
                    return response.json();
                }
            })
            .then((json) => {
                console.log(json);
                this.setState({
                    todo: json
                });
            });
    }
    _toggleItem(item) {
        const items = this.state.todo;
        for (let i in items) {
            if (items[i].description === item.description) {
                items[i].complete = !items[i].complete;
                break;
            }
        }
        this.setState({
            todo: items
        });

    }
    _addListItem(e) {
        e.preventDefault();
        const value = this.refs.newItem.value.trim();
        if (!value) {
            return;
        }
        const currentTasks = this.state.todo;
        currentTasks.push({
            complete: false,
            description: value
        });
        this.setState({
            todo: currentTasks
        });
        this.refs.newItem.value = '';
    }
    
    componentDidMount() {
        this._getTodoList();
    }
    render() {
        return (
            <div>
                <h1>To do</h1>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input type="text" className="mdl-textfield__input" id="new" ref="newItem" />
                    <label className="mdl-textfield__label" htmlFor="new">New Item</label>
                </div>
                &nbsp;
                <button type="button" onClick={this._addListItem} className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
                    <i className="material-icons">exposure_plus_1</i>
                    Add
                </button>
                <ul>
                    {this.state.todo.map((item) => {
                        const cssClass = item.complete === true ? "strike" : null;
                        return (
                            <li className={cssClass} key={item.description}>
                                {item.description}
                                <input type="checkbox" checked={item.complete} onChange={() => this._toggleItem(item)}/>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default Todo;