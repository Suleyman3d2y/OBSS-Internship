import ReactDOM from "react-dom";
import ShoppingList from "./ShoppingList";
import ShoppingTitle from "./ShoppingTitle";

export default function () {
  const shoppingList = {
    pageTitle: "My Shopping List",
    items: [
      { header: "Food", items: ["Apple", "Bread", "Cheese"] },
      { header: "Clothes", items: ["Shirt", "Pants", "Hat"] },
      { header: "Supplies", items: ["Pen", "Paper", "Glue"] }
    ]
  };
  let numOfItems = 0;
  shoppingList.items.forEach((element) => {
    numOfItems += element.items ? element.items.length : 0;
  });

  ReactDOM.render(
    <div align="center">
      <table>
        <tr>
          <ShoppingTitle
            header={shoppingList.pageTitle}
            numOfItems={numOfItems}
          />
        </tr>
        <tr>
          {shoppingList.items &&
            shoppingList.items.map((item) => (
              <ShoppingList items={item.items} name={item.header} />
            ))}
        </tr>
      </table>
    </div>,
    document.getElementById("root")
  );
}
