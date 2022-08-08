import React, {Component} from 'react';

class CarFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleCheckBoxChange = (event) => {
        this.setState({
            [event.target.name]:event.target.checked
        });
    }

    render() {
        console.log(this.state)
        return (
            <div>
    <label htmlFor="isNew">New:</label>
    <input name="isNew" type="checkbox" value={this.state.isNew} onChange={this.handleCheckBoxChange}/>
            <br/>
                <label htmlFor="model">Model: </label>
                <input name="model" type="text" value={this.state.model} onChange={this.handleChange}/>
            </div>

        );
    }
}

export default CarFilter;