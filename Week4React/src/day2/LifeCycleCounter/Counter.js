import React, {Component} from 'react';

class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {counter: 0}
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState((prevState) => {
                return {counter: prevState.counter + 1}
            })
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.interval)

    }

    render() {
        return (
            <div>
                Counter: {this.state.counter}
            </div>
        );
    }
}

export default Counter;