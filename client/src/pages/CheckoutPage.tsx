import { useEffect, useState } from 'react';
import { ShoppingCartItem, Series } from '../../../server/lib/data';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../components/useCart';

export function CheckoutPage() {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<unknown>();
  const navigate = useNavigate();
  const { cartItems = [], updateCart, removeFromCart } = useCart();

  useEffect(() => {
    async function getCartItems() {
      try {
        const response = await fetch('/api/shoppingCartItems');
        if (!response.ok) throw new Error(`Response status ${response.status}`);
        const items = (await response.json()) as (ShoppingCartItem & Series)[];
        console.log(items);
      } catch (err) {
        setErr(err);
      } finally {
        setLoading(false);
      }
    }
    getCartItems();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl bg-purple-200">
        Loading...
      </div>
    );
  }
  if (err) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl bg-purple-200">
        Error! {err instanceof Error ? err.message : 'Unknown Error'}
      </div>
    );
  }

  function handleAddQuantity(seriesId: number) {
    const item = cartItems.find((item) => item.seriesId === seriesId);
    if (!item) return;

    const updatedItem = { ...item, quantity: item.quantity + 1 };
    updateCart(updatedItem.seriesId, updatedItem.quantity);
  }

  function handleSubtractQuantity(seriesId: number) {
    const item = cartItems.find((item) => item.seriesId === seriesId);
    if (!item) return;

    const newQuantity = item.quantity - 1;
    if (newQuantity < 1) {
      removeFromCart(seriesId);
    } else {
      updateCart(seriesId, newQuantity);
    }
  }

  function handleDelete(shoppingCartItemsId: number) {
    removeFromCart(shoppingCartItemsId);
  }

  let totalQuantity = 0;
  let totalPrice = 0;

  for (let i = 0; i < cartItems.length; i++) {
    totalQuantity += cartItems[i].quantity;
    totalPrice += cartItems[i].price * cartItems[i].quantity;
    console.log(cartItems[i].price);
  }

  return (
    <div className="min-h-screen p-4 bg-purple-200">
      <button
        onClick={() => navigate('/series')}
        className="absolute px-2 py-1 mt-4 text-xl text-black bg-purple-100 rounded top-12 left-4">
        Back
      </button>
      <h1 className="mb-4 text-3xl font-bold text-center">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-xl text-center text-gray-600">
          Cart is empty! Keep Shopping!
        </p>
      ) : (
        <>
          <p className="mb-4 text-lg text-center">
            Total Items: {totalQuantity}
          </p>
          <div className="space-y-3">
            {cartItems.map((item) => (
              <div
                key={item.seriesId}
                className="flex items-center p-4 bg-white rounded shadow">
                <img
                  src={item.imageUrl}
                  alt={`Series ${item.seriesId}`}
                  className="object-cover w-40 mr-4 h-30"
                />
                <div className="flex-grow">
                  <h2 className="text-lg font-bold">Series {item.seriesId}</h2>
                  <p>Quantity: {item.quantity}</p>
                  <p className="mb-4 text-lg text-right">
                    Subtotal: ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => handleSubtractQuantity(item.seriesId)}
                      className="px-2 py-1 bg-gray-300 rounded">
                      -
                    </button>
                    <span className="px-2 mx-2">{item.quantity}</span>
                    <button
                      onClick={() => handleAddQuantity(item.seriesId)}
                      className="px-2 py-1 bg-gray-300 rounded">
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => handleDelete(item.shoppingCartItemsId)}
                    className="mt-2 text-red-500 underline">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="mb-4 text-xl text-right">
              Total: ${totalPrice.toFixed(2)}
            </p>

            <button className="px-8 py-3 ml-4 text-white bg-pink-500 rounded">
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
