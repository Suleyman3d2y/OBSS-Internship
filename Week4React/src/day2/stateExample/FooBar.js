import React, {Component, useState} from 'react';

class FooBar extends Component {

    constructor(props) {
        super(props);
        this.state = {foo: 123, bar:456}
    }

    render() {
        return (
            <div>
                <h1> foo: {this.state.foo} bar: {this.state.bar}</h1>
            </div>
        );
    }
}

/*const FooBar = () => {

    const [fooBar,setFooBar] = useState({foo:123, bar:456})

    return (
        <div>
            <h1> foo: {fooBar.foo} bar: {fooBar.bar}</h1>
        </div>
    )
}*/

export default FooBar;