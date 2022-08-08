import React, {Component} from 'react';

class ShoppingTitle extends Component {
  render() {
    let { header, numOfItems } = this.props;
    return (
        <div>
          <h1>{header}</h1>
          <h2>Total Number of Items: {numOfItems}</h2>
        </div>
    );
  }
}

export default ShoppingTitle;