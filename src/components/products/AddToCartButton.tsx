import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { Product } from '../../types/product';

interface AddToCartButtonProps {
  product: Product;
  className?: string;
}

export const AddToCartButton = ({ product, className = '' }: AddToCartButtonProps) => {
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_ITEM', payload: product });
    dispatch({ type: 'TOGGLE_CART' });
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`flex items-center justify-center gap-2 bg-light-turquoise hover:bg-soft-gold text-white transition-colors ${className}`}
    >
      <ShoppingCart className="w-4 h-4" />
      <span>Ajouter au panier</span>
    </button>
  );
};