import ShoppingList from "./ShoppingList";
import ShoppingTitle from "./ShoppingTitle";
import React, {Component} from 'react';

class ShoppingApp extends Component {

  render() {
    const shoppingList = {
      pageTitle: "My Shopping List",
      items: [
        {header: "Food", items: ["Apple", "Bread", "Cheese"]},
        {header: "Clothes", items: ["Shirt", "Pants", "Hat"]},
        {header: "Supplies", items: ["Pen", "Paper", "Gloove"]}
      ]
    };

    let numOfItems = 0;
    shoppingList.items.forEach(element => {
      numOfItems += element.items ? element.items.length : 0
    });
    return (
        <div>
          <ShoppingTitle header={shoppingList.pageTitle} numOfItems={numOfItems} />
          {shoppingList.items && shoppingList.items.map((item) => <ShoppingList header={item.header} items={item.items} />)}
        </div>
    );
  }
}

export default ShoppingApp;