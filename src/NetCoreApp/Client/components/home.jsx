import React, { Component } from 'react';
import SampleList from './list';
import { Grid } from './grid';

class Home extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Grid>
                <SampleList limit={10}/>
            </Grid>
        );
    }
}

export default Home;