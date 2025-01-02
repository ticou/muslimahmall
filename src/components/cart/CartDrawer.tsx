import React from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

export const CartDrawer = () => {
  const { state, dispatch } = useCart();

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = state.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      dispatch({ type: 'REMOVE_ITEM', payload: productId });
    } else {
      dispatch({
        type: 'UPDATE_QUANTITY',
        payload: { productId, quantity: newQuantity },
      });
    }
  };

  const buttonClasses = "w-6 h-6 flex items-center justify-center rounded-full text-white transition-colors duration-200";

  if (!state.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b px-4 py-3">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              <span className="font-medium">
                Panier ({totalItems} article{totalItems !== 1 ? 's' : ''})
              </span>
            </div>
            <button
              onClick={() => dispatch({ type: 'TOGGLE_CART' })}
              className="rounded-full p-1 hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart items */}
          <div className="flex-1 overflow-y-auto p-4">
            {state.items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-gray-500">
                <ShoppingBag className="h-12 w-12 mb-2" />
                <p>Votre panier est vide</p>
              </div>
            ) : (
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 rounded-lg border p-3"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-20 w-20 rounded-md object-cover"
                    />
                    <div className="flex flex-1 flex-col">
                      <h3 className="font-medium">{item.product.name}</h3>
                      <p className="text-sm text-gray-500">
                        {item.product.price.toLocaleString()}€
                      </p>
                      <div className="mt-2 flex items-center gap-3">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className={`${buttonClasses} bg-light-turquoise hover:bg-soft-gold`}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center font-medium text-dark-gray">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className={`${buttonClasses} bg-light-turquoise hover:bg-soft-gold`}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        dispatch({ type: 'REMOVE_ITEM', payload: item.product.id })
                      }
                      className="self-start rounded-full p-1 hover:bg-gray-100"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {state.items.length > 0 && (
            <div className="border-t p-4">
              <div className="mb-4 flex justify-between">
                <span className="font-medium">Sous-total</span>
                <span className="font-medium">
                  {subtotal.toLocaleString()}€
                </span>
              </div>
              <button className="w-full rounded-lg bg-light-turquoise py-3 text-white hover:bg-soft-gold transition-colors">
                Passer la commande
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};