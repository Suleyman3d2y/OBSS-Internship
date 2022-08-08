import React, {Component} from 'react';

class CounterWithButton extends Component {
    constructor(props) {
        super(props);
        this.state = {count: 0}
    }

    clickHandler = () => {
        console.log("Click handler.")
        this.setState((prevState) => {
            return {count: prevState.count +1}
        })
    }
    render() {
        console.log("Component rendered.")
        return (
            <div>
                <button onClick={this.clickHandler}>{this.state.count}</button>
            </div>
        );
    }
}

export default CounterWithButton;