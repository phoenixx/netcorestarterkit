import React, { Component } from 'react';
import { Grid } from './grid';
import Header from '../components/header';
import ReactCssTransitionGroup from 'react-addons-css-transition-group';
import Container from '../containers/mainContainer';

class Home extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Header/>
                <Grid>
                    <ReactCssTransitionGroup transitionName="appear"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={500}
                        component={Container}>
                        {React.cloneElement(this.props.children, { key: this.props.location.pathname })}
                    </ReactCssTransitionGroup>
                </Grid>
            </div>
        );
    }
}

Home.defaultProps = {
    location: {
        pathname: ""
    }
}

export default Home;