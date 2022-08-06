const ShoppingList = ({ items, name }) => {
  let message = [<h2>{name}</h2>];

  if (Array.isArray(items) && items.length) {
    for (let i = 0; i < items.length; i++) {
      message[i + 1] = (
        <h3>
          {i + 1}. {items[i]}
        </h3>
      );
    }
  } else {
    message[1] = <h3>There is no items</h3>;
  }

  return message;
};

export default ShoppingList;
