import { RootState } from "../../app/store";
import { CartItem } from "./card-item";
import { useSelector, useDispatch } from "react-redux";
import { addItem, clearCart, removeItem } from "./shoppingCart.slice";


function ShoppingCart() {

  const cart = useSelector((state: RootState) => state.shoppingCart.cart);
  const dispatch = useDispatch();

  const handleAddItem = (item: CartItem) => {
    dispatch(addItem(item));
  }

  const handleRemoveItem = (item: CartItem) => {
    dispatch(removeItem(item));
  }

  const handleClearCart = () => {
    dispatch(clearCart());
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">🛒 Shopping Cart</h1>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => handleAddItem({ id: 1, name: 'Apple', quantity: 1 })}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Apple
        </button>
        <button
          onClick={() => handleAddItem({ id: 2, name: 'Banana', quantity: 1 })}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Add Banana
        </button>
        <button
          onClick={handleClearCart}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Clear Cart
        </button>
      </div>

      <ul className="space-y-2">
        {cart.map(item => (
          <li key={item.id} className="flex justify-between items-center border p-2 rounded">
            <span>{item.name} (x{item.quantity})</span>
            <button
              onClick={() => handleRemoveItem(item)}
              className="text-red-600"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      {cart.length === 0 && <p className="mt-4 text-gray-500">Your cart is empty.</p>}
    </div>
  );
}

export default ShoppingCart;