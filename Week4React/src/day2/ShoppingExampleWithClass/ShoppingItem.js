import React, {Component} from 'react';

class ShoppingItem extends Component {
  render() {
    let {item} = this.props;
    return <li>{item}</li>
  }
}

export default ShoppingItem;