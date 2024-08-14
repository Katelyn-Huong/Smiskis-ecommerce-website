import { useContext } from 'react';
import { CartContext, CartItemType } from './CartContext';

export function useCart(): CartItemType {
  const values = useContext(CartContext);
  if (!values) throw new Error('useCart must be used inside a CartProvider');
  return values;
}
