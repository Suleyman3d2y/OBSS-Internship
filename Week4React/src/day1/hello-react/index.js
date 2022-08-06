import ReactDOM from "react-dom";
import { React, StrictMode } from "react";
import Hello from "./Hello";


export default function () {
  let propsObject = {
    title: "My Title",
    name: "My Name"
  };

  ReactDOM.render(
    <StrictMode>
      <Hello title={propsObject.title} name={propsObject.name} />
    </StrictMode>,
    document.getElementById("root")
  );
}
