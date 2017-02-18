import React, { Component } from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import Home from '../components/Home';
import SampleList from '../components/list';
import Todo from '../components/Todo';
import { IntlProvider } from 'react-intl';

class RouteComponent extends Component {
    constructor(props) {
        super(props);
        this.state = Object.assign({}, this.props);
    }
    render() {
        return (
            <IntlProvider locale={this.state.locale}>
                <Router history={hashHistory}>
                    <Route path="/" component={Home}>
                        <IndexRoute component={SampleList} />
                        <Route path="todo" component={Todo} />
                    </Route>
                </Router>
            </IntlProvider>
        );
    }
}

export default RouteComponent;