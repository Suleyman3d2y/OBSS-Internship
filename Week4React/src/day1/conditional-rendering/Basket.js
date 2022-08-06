const Basket = ({ items }) => {
  let message;

  if (Array.isArray(items) && items.length) {
    message = <h1>There is {items.length} items in basket.</h1>;
  } else {
    message = <h1>There are no items.</h1>;
  }
  return message;
};

export default Basket;
