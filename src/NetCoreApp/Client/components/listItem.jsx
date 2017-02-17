import React, { Component } from 'react';
import { FormattedDate, FormattedNumber, FormattedTime } from 'react-intl';

class ListItem extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <li>
                <div className="mdl-cell mdl-cell--12-col">
                    <FormattedDate value={this.props.date} /> <FormattedTime value={this.props.date} /> :: {this.props.text} :: <FormattedNumber value={this.props.number} style="currency" currency={"GBP"} />
                    &nbsp;
                    <button type="button" onClick={this.props.removeItem} className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent">
                        <i className="material-icons">cancel</i>
                        Remove
                    </button>
                </div>
            </li>
        );
    }
}

export default ListItem;