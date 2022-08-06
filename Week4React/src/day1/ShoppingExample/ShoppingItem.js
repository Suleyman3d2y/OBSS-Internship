const ShoppingItem = ({ Foods, Clothes, Supplies }) => {
  let items;
  items = Foods.length + Clothes.length + Supplies.length;
  return items;
};

export default ShoppingItem;
