import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';

class Header extends Component {
    constructor(props) {
        super(props);
        this._navigate = this._navigate.bind(this);
    }
    _navigate(location) {
        this.context.router.push(location);
    }
    render() {
        return (
            <header className="mdl-layout__header">
                <div className="mdl-layout__header-row">
                    <span className="mdl-layout-title">Title</span>
                    <div className="mdl-layout-spacer"></div>
                    <nav className="mdl-navigation">
                        <a className="mdl-navigation__link" href="/#">Home</a>
                        <a className="mdl-navigation__link" href="/#todo">Todo</a>
                    </nav>
                </div>
            </header>
        );
    }
}

Header.contextTypes = {
    router: PropTypes.object.isRequired
}

export default Header;