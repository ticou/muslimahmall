import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { Product } from '../../types/product';

interface ProductQuantityButtonProps {
  product: Product;
  className?: string;
}

export const ProductQuantityButton = ({ product, className = '' }: ProductQuantityButtonProps) => {
  const { state, dispatch } = useCart();
  
  const cartItem = state.items.find(item => item.product.id === product.id);
  
  if (!cartItem) {
    return null;
  }

  const updateQuantity = (newQuantity: number) => {
    if (newQuantity < 1) {
      dispatch({ type: 'REMOVE_ITEM', payload: product.id });
    } else {
      dispatch({
        type: 'UPDATE_QUANTITY',
        payload: { productId: product.id, quantity: newQuantity },
      });
    }
  };

  const buttonClasses = "w-6 h-6 flex items-center justify-center rounded-full text-white transition-colors duration-200";

  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <button
        onClick={() => updateQuantity(cartItem.quantity - 1)}
        className={`${buttonClasses} bg-light-turquoise hover:bg-soft-gold`}
      >
        <Minus className="w-3 h-3" />
      </button>
      <span className="w-8 text-center font-medium text-dark-gray">{cartItem.quantity}</span>
      <button
        onClick={() => updateQuantity(cartItem.quantity + 1)}
        className={`${buttonClasses} bg-light-turquoise hover:bg-soft-gold`}
      >
        <Plus className="w-3 h-3" />
      </button>
    </div>
  );
};