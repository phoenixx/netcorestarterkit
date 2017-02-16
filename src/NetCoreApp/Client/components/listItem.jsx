import React, { Component } from 'react';
import { FormattedDate, FormattedNumber, FormattedTime } from 'react-intl';

class ListItem extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <li>
                <FormattedDate value={this.props.date} /> <FormattedTime value={this.props.date}/> :: {this.props.text} :: <FormattedNumber value={this.props.number} style="currency" currency={"GBP"}/>
            </li>
        );
    }
}

export default ListItem;