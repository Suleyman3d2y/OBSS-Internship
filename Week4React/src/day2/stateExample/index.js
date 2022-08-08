import ReactDOM from "react-dom";
import { StrictMode } from "react";
import FooBar from "./FooBar";
import Counter from "./Counter";
import ErroneousCounter from "./ErroneousCounter";

export default function () {
    const rootElement = document.getElementById("root");
    ReactDOM.render(
        <StrictMode>
            Counter: <Counter />
            <br/>
            Erroneous Counter: <ErroneousCounter />
        </StrictMode>,
        rootElement
    );
}
