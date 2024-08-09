import { useEffect, useState } from 'react';
import { ShoppingCartItem, Series } from '../../../server/lib/data';
import { useNavigate } from 'react-router-dom';

export function CheckoutPage() {
  const [cartItems, setCartItems] = useState<(ShoppingCartItem & Series)[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<unknown>();
  const navigate = useNavigate();

  useEffect(() => {
    async function getCartItems() {
      try {
        const response = await fetch('/api/shoppingCartItems');
        if (!response.ok) throw new Error(`Response status ${response.status}`);
        const items = (await response.json()) as (ShoppingCartItem & Series)[];
        console.log(items);
        setCartItems(items);
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

  async function updateQuantity(
    shoppingCartItemsId: number,
    newQuantity: number
  ) {
    try {
      const response = await fetch(
        `/api/shoppingCartItems/${shoppingCartItemsId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ quantity: newQuantity }),
        }
      );
      if (!response.ok) throw new Error(`Response status ${response.status}`);
      const updatedCartItems = cartItems.map((item) => {
        if (item.shoppingCartItemsId === shoppingCartItemsId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      setCartItems(updatedCartItems);
    } catch (err) {
      setErr(err);
    }
  }

  async function handleAddQuantity(shoppingCartItemsId: number) {
    const item = cartItems.find(
      (item) => item.shoppingCartItemsId === shoppingCartItemsId
    );
    if (!item) return;

    const newQuantity = item.quantity + 1;
    await updateQuantity(shoppingCartItemsId, newQuantity);
  }

  async function handleSubtractQuantity(shoppingCartItemsId: number) {
    const item = cartItems.find(
      (item) => item.shoppingCartItemsId === shoppingCartItemsId
    );
    if (!item) return;

    const newQuantity = item.quantity - 1;
    if (newQuantity < 1) return;

    await updateQuantity(shoppingCartItemsId, newQuantity);
  }

  async function handleDelete(shoppingCartItemsId: number) {
    try {
      const response = await fetch(
        `/api/shoppingCartItems/${shoppingCartItemsId}`,
        {
          method: 'DELETE',
        }
      );
      if (!response.ok) throw new Error(`Response status ${response.status}`);
      setCartItems(
        cartItems.filter(
          (item) => item.shoppingCartItemsId !== shoppingCartItemsId
        )
      );
    } catch (err) {
      setErr(err);
    }
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
                key={item.shoppingCartItemsId}
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
                      onClick={() =>
                        handleSubtractQuantity(item.shoppingCartItemsId)
                      }
                      className="px-2 py-1 bg-gray-300 rounded">
                      -
                    </button>
                    <span className="px-2 mx-2">{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleAddQuantity(item.shoppingCartItemsId)
                      }
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
            <button className="px-8 py-3 text-white bg-pink-500 rounded">
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
