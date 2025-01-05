import React from 'react';
import { Clock, CheckCircle } from 'lucide-react';
import { usePayments } from '../../hooks/usePayments';

export const PaymentsPage = () => {
  const { installments } = usePayments();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-playfair font-bold text-dark-gray mb-8">
        Mes paiements en cours
      </h1>

      <div className="space-y-6">
        {installments.map((installment) => (
          <div key={installment.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="font-playfair text-xl text-dark-gray mb-2">
                    Commande #{installment.orderId}
                  </h2>
                  <p className="text-gray-600">
                    {new Date(installment.startDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-dark-gray">
                    {installment.remainingAmount.toLocaleString()}€ restants
                  </p>
                  <p className="text-sm text-gray-500">
                    sur {installment.totalAmount.toLocaleString()}€
                  </p>
                </div>
              </div>

              {/* Produits de la commande */}
              <div className="space-y-4 mb-6">
                {installment.items.map((item) => (
                  <div key={item.product.id} className="flex gap-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div>
                      <p className="font-medium text-dark-gray">
                        {item.product.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        Quantité: {item.quantity}
                      </p>
                      <p className="text-sm font-medium">
                        {item.price.toLocaleString()}€
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Échéancier */}
              <div className="border-t pt-4">
                <h3 className="font-medium text-dark-gray mb-4">Échéancier</h3>
                <div className="space-y-3">
                  {installment.schedule.map((payment, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        {payment.paid ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <Clock className="w-5 h-5 text-gray-400" />
                        )}
                        <div>
                          <p className="font-medium text-dark-gray">
                            Paiement {index + 1}
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(payment.dueDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-medium ${
                          payment.paid ? 'text-green-500' : 'text-dark-gray'
                        }`}>
                          {payment.amount.toLocaleString()}€
                        </p>
                        {!payment.paid && payment.dueDate < new Date().toISOString() && (
                          <p className="text-sm text-red-500">En retard</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bouton de paiement */}
              {installment.remainingAmount > 0 && (
                <button className="mt-6 w-full bg-light-turquoise hover:bg-soft-gold text-white py-3 rounded-lg transition-colors">
                  Effectuer le prochain paiement
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};