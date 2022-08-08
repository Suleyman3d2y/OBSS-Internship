import ReactDOM from "react-dom";
import {StrictMode} from "react";
import ProductList from "./ProductList";


export default function () {
    var products = [
        {name: "Apple", price: 3},
        {name: "Banana", price: 1},
        {name: "Carrot", price: 2},
        {name: "Apple", price: 5},
        {name: "Eggplant", price: 4}
    ]

    const rootElement = document.getElementById("root");
    ReactDOM.render(
        <StrictMode>
            <ProductList products={products} />
        </StrictMode>,
        rootElement
    );


}