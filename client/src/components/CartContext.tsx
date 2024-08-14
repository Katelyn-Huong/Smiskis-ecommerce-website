import { createContext, ReactNode, useEffect, useState } from 'react';

export type CartItem = {
  shoppingCartItemsId: number;
  seriesId: number;
  quantity: number;
  imageUrl: string;
  price: number;
};

const defaultCartValue: CartItemType = {
  cartItems: undefined,
  addToCart: () => undefined,
  updateCart: () => undefined,
  removeFromCart: () => undefined,
  emptyCart: () => undefined,
};

export const CartContext = createContext<CartItemType>(defaultCartValue);

type Props = {
  children: ReactNode;
};

export type CartItemType = {
  cartItems: CartItem[] | undefined;
  addToCart: (item: CartItem) => void;
  updateCart: (seriesId: number, newQuantity: number) => void;
  removeFromCart: (seriesId: number) => void;
  emptyCart: () => void;
};
export function CartProvider({ children }: Props) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    async function getInitialCart() {
      try {
        const response = await fetch('/api/shoppingCartItems');
        if (!response.ok) {
          throw new Error(`Failed to get cart items : ${response.status}`);
        }
        const result = await response.json();
        setCartItems(result);
      } catch (err) {
        console.error('Error loading cart items:', err);
      }
    }
    getInitialCart();
  }, []);

  function addToCart(item: CartItem) {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (cartItem) => cartItem.seriesId === item.seriesId
      );
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.seriesId === item.seriesId
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      } else {
        return [...prevItems, item];
      }
    });
  }

  async function updateCart(seriesId: number, newQuantity: number) {
    try {
      const updateCartCheckoutResponse = await fetch(
        `/api/shoppingCartItems/${seriesId}`,
        {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({ quantity: newQuantity }),
        }
      );
      if (!updateCartCheckoutResponse.ok)
        throw new Error(`Response status ${updateCartCheckoutResponse.status}`);
      setCartItems((prevItems) =>
        prevItems.map((cartItem) =>
          cartItem.seriesId === seriesId
            ? { ...cartItem, quantity: newQuantity }
            : cartItem
        )
      );
    } catch (err) {
      console.error(err);
    }
  }

  // update database when component unmount
  // or update database as soon as add or subtract quantity

  async function removeFromCart(seriesId: number) {
    console.log('seriesId2', seriesId);
    try {
      const response = await fetch(`/api/shoppingCartItems/${seriesId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete cart item: ${response.status}`);
      }

      setCartItems((prevItems) =>
        prevItems.filter((cartItem) => cartItem.seriesId !== seriesId)
      );
    } catch (err) {
      console.error('Error deleting cart item:', err);
    }
  }

  async function emptyCart() {
    try {
      const response = await fetch(`/api/shoppingCartItems`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete all cart items: ${response.status}`);
      }

      setCartItems([]);
    } catch (err) {
      console.error('Error emptying cart:', err);
    }
  }

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateCart, removeFromCart, emptyCart }}>
      {children}
    </CartContext.Provider>
  );
}
