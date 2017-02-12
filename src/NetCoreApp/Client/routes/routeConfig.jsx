import React, { Component } from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import Home from '../components/Home';
import { IntlProvider } from 'react-intl';

class RouteComponent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <IntlProvider locale={'en-GB'}>
                <Router history={hashHistory}>
                    <Route path="/" component={Home}>
                    </Route>
                </Router>
            </IntlProvider>
        );
    }
}

export default RouteComponent;