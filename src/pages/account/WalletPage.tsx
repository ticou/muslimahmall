import React, { useState } from 'react';
import { Plus, ArrowDown, ArrowUp } from 'lucide-react';
import { useWallet } from '../../hooks/useWallet';
import { AddCreditForm } from '../../components/wallet/AddCreditForm';

export const WalletPage = () => {
  const { balance, transactions, addCredit } = useWallet();
  const [showAddCreditForm, setShowAddCreditForm] = useState(false);

  const handleAddCredit = async (amount: number, paymentMethod: string) => {
    await addCredit(amount, paymentMethod);
    setShowAddCreditForm(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-playfair font-bold text-dark-gray mb-8">
        Mon wallet
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Solde actuel - Fixé en haut à gauche */}
        <div className="lg:sticky lg:top-24 h-fit">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="font-playfair text-xl text-dark-gray mb-4">
              Solde disponible
            </h2>
            <p className="text-3xl font-bold text-soft-gold">
              {balance.toLocaleString()}€
            </p>
            <button
              onClick={() => setShowAddCreditForm(true)}
              className="mt-4 w-full flex items-center justify-center gap-2 bg-light-turquoise hover:bg-soft-gold text-white py-2 px-4 rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5" />
              Ajouter du crédit
            </button>
          </div>
        </div>

        {/* Historique des transactions */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="font-playfair text-xl text-dark-gray mb-4">
              Historique des transactions
            </h2>
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div 
                  key={transaction.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-full ${
                      transaction.type === 'credit' 
                        ? 'bg-green-100 text-green-600'
                        : 'bg-red-100 text-red-600'
                    }`}>
                      {transaction.type === 'credit' ? (
                        <ArrowDown className="w-5 h-5" />
                      ) : (
                        <ArrowUp className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-dark-gray">
                        {transaction.description}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(transaction.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <p className={`font-medium ${
                    transaction.type === 'credit'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}>
                    {transaction.type === 'credit' ? '+' : '-'}
                    {transaction.amount.toLocaleString()}€
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Formulaire d'ajout de crédit */}
      {showAddCreditForm && (
        <AddCreditForm
          onSubmit={handleAddCredit}
          onClose={() => setShowAddCreditForm(false)}
        />
      )}
    </div>
  );
};