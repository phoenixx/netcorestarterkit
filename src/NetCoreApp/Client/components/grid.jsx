import React, { Component } from 'react';

export class Grid extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div className="mdl-grid">
                {this.props.children}
            </div>
        );
    }
}