import React, {Component} from 'react';
import ShoppingItem from "./ShoppingItem";
class ShoppingList extends Component {
  render() {
    let {header,items} = this.props
    return (
        <div>
          <h3>{header}</h3>
          <ol>
            { items && items.map((item) => <ShoppingItem key={item} item={item} />) }
          </ol>
        </div>
    );
  }
}

export default ShoppingList;