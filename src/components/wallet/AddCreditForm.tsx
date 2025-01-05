import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AddCreditFormProps {
  onSubmit: (amount: number, paymentMethod: string) => Promise<void>;
  onClose: () => void;
}

export const AddCreditForm = ({ onSubmit, onClose }: AddCreditFormProps) => {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('CARD');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await onSubmit(Number(amount), paymentMethod);
      onClose();
    } catch (err) {
      setError("Une erreur s'est produite lors du paiement" + err);
    } finally {
      setLoading(false);
    }
  };

  const presetAmounts = [10, 20, 50, 100];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="font-playfair text-xl text-dark-gray">
            Ajouter du crédit
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Montants prédéfinis */}
          <div>
            <label className="block text-sm font-medium text-dark-gray mb-2">
              Montant
            </label>
            <div className="grid grid-cols-2 gap-2">
              {presetAmounts.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setAmount(preset.toString())}
                  className={`p-3 border rounded-lg text-center transition-colors ${
                    amount === preset.toString()
                      ? 'border-light-turquoise bg-light-turquoise/10'
                      : 'border-gray-200 hover:border-light-turquoise'
                  }`}
                >
                  {preset}€
                </button>
              ))}
            </div>
          </div>

          {/* Montant personnalisé */}
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-dark-gray mb-2">
              Ou entrez un montant personnalisé
            </label>
            <div className="relative">
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="1"
                step="1"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-light-turquoise"
                required
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                €
              </span>
            </div>
          </div>

          {/* Moyen de paiement */}
          <div>
            <label className="block text-sm font-medium text-dark-gray mb-2">
              Moyen de paiement
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setPaymentMethod('CARD')}
                className={`p-4 border rounded-lg text-center ${
                  paymentMethod === 'CARD'
                    ? 'border-light-turquoise bg-light-turquoise/10'
                    : 'border-gray-200'
                }`}
              >
                Carte bancaire
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('MOBILE_MONEY')}
                className={`p-4 border rounded-lg text-center ${
                  paymentMethod === 'MOBILE_MONEY'
                    ? 'border-light-turquoise bg-light-turquoise/10'
                    : 'border-gray-200'
                }`}
              >
                Mobile Money
              </button>
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !amount}
            className="w-full bg-light-turquoise hover:bg-soft-gold text-white py-3 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? 'Traitement...' : 'Payer'}
          </button>
        </form>
      </div>
    </div>
  );
};