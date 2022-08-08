import React, {Component} from 'react';

class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {value: 0}
    }

    componentDidMount() {
        this.setState((prevState, props) => {
            return {value: prevState.value +1};
        });
        this.setState((prevState, props) => {
            return {value: prevState.value +1};
        });
        this.setState((prevState, props) => {
            return {value: prevState.value +1};
        });
        this.setState((prevState, props) => {
            return {value: prevState.value +1};
        });
        
    }

    render() {
        return (
            <div>
                Counter: {this.state.value}
            </div>
        );
    }
}

export default Counter;