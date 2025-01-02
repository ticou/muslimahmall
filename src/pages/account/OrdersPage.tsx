import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
// import orderService from '../../services/order.service';
import orderService from '../../services/offline/order.service';
import { Order } from '../../types/order';

const OrderStatus = {
  PENDING: { label: 'En attente', color: 'bg-yellow-100 text-yellow-800' },
  PAID: { label: 'Payée', color: 'bg-green-100 text-green-800' },
  PROCESSING: { label: 'En traitement', color: 'bg-blue-100 text-blue-800' },
  SHIPPED: { label: 'Expédiée', color: 'bg-purple-100 text-purple-800' },
  DELIVERED: { label: 'Livrée', color: 'bg-green-100 text-green-800' },
  CANCELLED: { label: 'Annulée', color: 'bg-red-100 text-red-800' },
};

export const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewProduct, setReviewProduct] = useState<{
    orderId: string;
    productId: string;
    name: string;
  } | null>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const userOrders = await orderService.getOrders();
        setOrders(userOrders);
      } catch (err) {
        setError('Erreur lors du chargement des commandes' + err);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  const handleReview = async () => {
    if (!reviewProduct) return;

    try {
      await orderService.addReview(
        reviewProduct.orderId,
        reviewProduct.productId,
        rating,
        comment
      );
      setShowReviewModal(false);
      setReviewProduct(null);
      setRating(5);
      setComment('');
    } catch (err) {
      setError("Erreur lors de l'ajout de l'avis" + err);
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-playfair font-bold text-dark-gray mb-8">
        Mes commandes
      </h1>

      {error && (
        <p className="text-red-500 mb-4">{error}</p>
      )}

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-gray-500">
                    Commande #{order.id}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${OrderStatus[order.status].color}`}>
                  {OrderStatus[order.status].label}
                </span>
              </div>

              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.product.id} className="flex gap-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <Link
                        to={`/produit/${item.product.id}`}
                        className="font-medium hover:text-light-turquoise"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-gray-600">
                        Quantité: {item.quantity}
                      </p>
                      <p className="text-sm font-medium">
                        {item.price.toLocaleString()}€
                      </p>
                    </div>
                    {order.status === 'DELIVERED' && (
                      <button
                        onClick={() => {
                          setReviewProduct({
                            orderId: order.id,
                            productId: item.product.id,
                            name: item.product.name
                          });
                          setShowReviewModal(true);
                        }}
                        className="text-light-turquoise hover:text-soft-gold"
                      >
                        Donner mon avis
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between text-sm">
                  <span>Sous-total</span>
                  <span>{order.subtotal.toLocaleString()}€</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Livraison</span>
                  <span>{order.shippingCost.toLocaleString()}€</span>
                </div>
                <div className="flex justify-between font-semibold mt-2">
                  <span>Total</span>
                  <span>{order.total.toLocaleString()}€</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal d'avis */}
      {showReviewModal && reviewProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-playfair font-semibold text-dark-gray mb-4">
              Donner mon avis sur {reviewProduct.name}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark-gray mb-2">
                  Note
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      onClick={() => setRating(value)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          value <= rating
                            ? 'fill-soft-gold text-soft-gold'
                            : 'fill-gray-200 text-gray-200'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="comment" className="block text-sm font-medium text-dark-gray mb-2">
                  Commentaire
                </label>
                <textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                />
              </div>

              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Annuler
                </button>
                <button
                  onClick={handleReview}
                  className="px-4 py-2 bg-light-turquoise text-white rounded-lg hover:bg-soft-gold transition-colors"
                >
                  Publier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};