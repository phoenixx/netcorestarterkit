import React, { Component } from 'react';

class ListItem extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <li>
                {this.props.date} :: {this.props.text} :: {this.props.number}
            </li>
        );
    }
}

export default ListItem;