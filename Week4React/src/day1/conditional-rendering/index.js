import ReactDOM from "react-dom";
import Basket from "./Basket";

export default function () {
  let items = ["item1", "item2", "item3"];
  //let items [];
  ReactDOM.render(<Basket items={items} />, document.getElementById("root"));
}
