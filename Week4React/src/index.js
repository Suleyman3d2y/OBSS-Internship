//import { renderApp, renderApp1 } from "./App";
//import simpleCounterRenderer from "./day1/counter";
//import StyleUsageRenderer from "./day1/style-usage"
//import productRenderer from "./day1/productExample"
//import nestedElementRenderer from "./day1/nestedElement"
//import HelloRenderer from "./day1/hello-react";
//import ConditionalRenderer from "./day1/conditional-rendering";
//import ShopRenderer from "./day1/ShoppingExample/ShoppingApp";

import App from "./day1/Transportation/App"
import {createRoot} from "react-dom/client";
import {BrowserRouter as Router} from "react-router-dom";


const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
    <Router>
        <App/>
    </Router>
)

//renderApp();
//simpleCounterRenderer();
//StyleUsageRenderer();
//nestedElementRenderer();
//productRenderer();
//HelloRenderer();
//ConditionalRenderer();
//ShopRenderer();


