import ReactDOM from "react-dom";
import { StrictMode } from "react";
import Switch from "./Switch";

export default function () {
    const rootElement = document.getElementById("root");
    ReactDOM.render(
        <StrictMode>
            <Switch />
        </StrictMode>,
        rootElement
    );
}
