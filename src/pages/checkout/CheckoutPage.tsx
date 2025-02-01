import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { AddressForm } from '../../components/checkout/AddressForm';
import { PaymentForm } from '../../components/checkout/PaymentForm';
// import orderService from '../../services/order.service';
import orderService from '../../services/offline/order.service';
import { Address, PaymentMethod, PaymentDetails } from '../../types/order';
import { ROUTES } from '@/config/routes.config';

export const CheckoutPage = () => {
  const { state: cartState } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const subtotal = cartState.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shippingCost = 10; // À adapter selon vos besoins
  const total = subtotal + shippingCost;

  useEffect(() => {
    const loadAddresses = async () => {
      try {
        const userAddresses = await orderService.getAddresses();
        setAddresses(userAddresses);
        const defaultAddress = userAddresses.find(addr => addr.isDefault);
        if (defaultAddress) {
          setSelectedAddress(defaultAddress.id);
        }
      } catch (err) {
        setError("Erreur lors du chargement des adresses" + err);
      }
    };

    loadAddresses();
  }, []);

  const handleAddAddress = async (address: Omit<Address, 'id' | 'userId'>) => {
    try {
      const newAddress = await orderService.addAddress(address);
      setAddresses([...addresses, newAddress]);
      setSelectedAddress(newAddress.id);
      setShowAddressForm(false);
    } catch (err) {
      setError("Erreur lors de l'ajout de l'adresse" + err);
    }
  };

  const handlePayment = async (method: PaymentMethod, details: PaymentDetails) => {
    setLoading(true);
    setError('');

    try {
      const items = cartState.items.map(item => ({
        productId: item.product.id,
        quantity: item.quantity
      }));

      await orderService.createOrder(items, selectedAddress, method, details);
      navigate(ROUTES.PATH_COMMANDES);
    } catch (err) {
      setError('Erreur lors du paiement' + err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-playfair font-bold text-dark-gray mb-8">
        Finaliser la commande
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Étape 1: Adresse de livraison */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-playfair font-semibold text-dark-gray mb-6">
              1. Adresse de livraison
            </h2>

            {showAddressForm ? (
              <AddressForm onSubmit={handleAddAddress} />
            ) : (
              <div className="space-y-4">
                {addresses.map((address) => (
                  <label
                    key={address.id}
                    className="flex items-start p-4 border rounded-lg cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="address"
                      value={address.id}
                      checked={selectedAddress === address.id}
                      onChange={(e) => setSelectedAddress(e.target.value)}
                      className="mt-1"
                    />
                    <div className="ml-4">
                      <p className="font-medium">{address.fullName}</p>
                      <p className="text-sm text-gray-600">{address.phone}</p>
                      <p className="text-sm text-gray-600">
                        {address.street}, {address.city} {address.postalCode}
                      </p>
                      <p className="text-sm text-gray-600">{address.country}</p>
                    </div>
                  </label>
                ))}

                <button
                  onClick={() => setShowAddressForm(true)}
                  className="text-light-turquoise hover:text-soft-gold"
                >
                  + Ajouter une nouvelle adresse
                </button>
              </div>
            )}
          </div>

          {/* Étape 2: Paiement */}
          {selectedAddress && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-playfair font-semibold text-dark-gray mb-6">
                2. Paiement
              </h2>
              <PaymentForm onSubmit={handlePayment} />
            </div>
          )}
        </div>

        {/* Récapitulatif de la commande */}
        <div className="bg-white p-6 rounded-lg shadow-md h-fit">
          <h2 className="text-xl font-playfair font-semibold text-dark-gray mb-6">
            Récapitulatif
          </h2>

          <div className="space-y-4">
            {cartState.items.map((item) => (
              <div key={item.product.id} className="flex gap-4">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div className="flex-1">
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-sm text-gray-600">Quantité: {item.quantity}</p>
                  <p className="text-sm font-medium">
                    {(item.product.price * item.quantity).toLocaleString()}€
                  </p>
                </div>
              </div>
            ))}

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Sous-total</span>
                <span>{subtotal.toLocaleString()}€</span>
              </div>
              <div className="flex justify-between">
                <span>Livraison</span>
                <span>{shippingCost.toLocaleString()}€</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>{total.toLocaleString()}€</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <p className="mt-4 text-red-500 text-sm">{error}</p>
      )}
    </div>
  );
};