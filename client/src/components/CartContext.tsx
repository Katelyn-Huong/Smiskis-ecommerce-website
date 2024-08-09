import { createContext, ReactNode, useEffect, useState } from 'react';

export type CartItem = {
  seriesId: number;
  quantity: number;
  imageUrl: string;
};

type CartItemType = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  updateCart: (item: CartItem) => void;
  removeFromCart: (seriesId: number) => void;
  emptyCart: () => void;
};
const defaultCartValue: CartItemType = {
  cartItems: [],
  addToCart: () => undefined,
  updateCart: () => undefined,
  removeFromCart: () => undefined,
  emptyCart: () => undefined,
};

export const CartContext = createContext<CartItemType>(defaultCartValue);

type Props = {
  children: ReactNode;
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
    const updatedCart = [...cartItems, item];
    setCartItems(updatedCart);
  }
  function updateCart(item: CartItem) {
    const updatedCart = cartItems.map((cartItem) =>
      cartItem.seriesId === item.seriesId ? item : cartItem
    );
    setCartItems(updatedCart);
  }
  function removeFromCart(seriesId: number) {
    const updatedCart = cartItems.filter(
      (cartItem) => cartItem.seriesId !== seriesId
    );
    setCartItems(updatedCart);
  }
  function emptyCart() {
    const updatedCart: CartItem[] = [];
    setCartItems(updatedCart);
  }
  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateCart, removeFromCart, emptyCart }}>
      {children}
    </CartContext.Provider>
  );
}
