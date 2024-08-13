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

  function updateCart(seriesId: number, newQuantity: number) {
    setCartItems((prevItems) =>
      prevItems.map((cartItem) =>
        cartItem.seriesId === seriesId
          ? { ...cartItem, quantity: newQuantity }
          : cartItem
      )
    );
  }

  async function removeFromCart(shoppingCartItemsId: number) {
    try {
      const response = await fetch(
        `/api/shoppingCartItems/${shoppingCartItemsId}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete cart item: ${response.status}`);
      }

      setCartItems((prevItems) =>
        prevItems.filter(
          (cartItem) => cartItem.shoppingCartItemsId !== shoppingCartItemsId
        )
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
