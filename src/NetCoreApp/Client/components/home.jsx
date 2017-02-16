import React, { Component } from 'react';
import SampleList from './list';

class Home extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <SampleList limit={10}/>
            </div>
        );
    }
}

export default Home;