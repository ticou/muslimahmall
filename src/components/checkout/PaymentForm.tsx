import React, { useState } from 'react';
import { PaymentMethod, PaymentDetails } from '../../types/order';

interface PaymentFormProps {
  onSubmit: (method: PaymentMethod, details: PaymentDetails) => void;
}

export const PaymentForm = ({ onSubmit }: PaymentFormProps) => {
  const [method, setMethod] = useState<PaymentMethod>('CARD');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [provider, setProvider] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const details: PaymentDetails = method === 'CARD'
      ? { cardNumber, expiryDate, cvv }
      : { mobileNumber, provider };
    onSubmit(method, details);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-dark-gray mb-2">
          Méthode de paiement
        </label>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setMethod('CARD')}
            className={`p-4 border rounded-lg text-center ${
              method === 'CARD'
                ? 'border-light-turquoise bg-light-turquoise/10'
                : 'border-gray-200'
            }`}
          >
            Carte bancaire
          </button>
          <button
            type="button"
            onClick={() => setMethod('MOBILE_MONEY')}
            className={`p-4 border rounded-lg text-center ${
              method === 'MOBILE_MONEY'
                ? 'border-light-turquoise bg-light-turquoise/10'
                : 'border-gray-200'
            }`}
          >
            Mobile Money
          </button>
        </div>
      </div>

      {method === 'CARD' ? (
        <div className="space-y-4">
          <div>
            <label htmlFor="cardNumber" className="block text-sm font-medium text-dark-gray">
              Numéro de carte
            </label>
            <input
              id="cardNumber"
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="expiryDate" className="block text-sm font-medium text-dark-gray">
                Date d'expiration
              </label>
              <input
                id="expiryDate"
                type="text"
                placeholder="MM/AA"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                required
              />
            </div>

            <div>
              <label htmlFor="cvv" className="block text-sm font-medium text-dark-gray">
                CVV
              </label>
              <input
                id="cvv"
                type="text"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                required
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label htmlFor="provider" className="block text-sm font-medium text-dark-gray">
              Opérateur
            </label>
            <select
              id="provider"
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              required
            >
              <option value="">Sélectionner un opérateur</option>
              <option value="ORANGE">Orange Money</option>
              <option value="MTN">MTN Mobile Money</option>
              <option value="MOOV">Moov Money</option>
            </select>
          </div>

          <div>
            <label htmlFor="mobileNumber" className="block text-sm font-medium text-dark-gray">
              Numéro de téléphone
            </label>
            <input
              id="mobileNumber"
              type="tel"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>
        </div>
      )}

      <button
        type="submit"
        className="w-full rounded-lg bg-light-turquoise py-2 text-white hover:bg-soft-gold transition-colors"
      >
        Payer
      </button>
    </form>
  );
};