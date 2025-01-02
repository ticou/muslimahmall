import React from 'react';
import { useParams } from 'react-router-dom';
import { Star, ShoppingCart, Heart } from 'lucide-react';

export const ProductPage = () => {
  const { productId } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Image du produit */}
          <div className="aspect-square rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1631233859262-0d7b12ea7d4c"
              alt="Produit"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Détails du produit */}
          <div className="space-y-6">
            <div>
              <h1 className="font-playfair text-3xl text-dark-gray mb-2">Nom du produit</h1>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <Star className="w-5 h-5 fill-soft-gold text-soft-gold" />
                  <span className="ml-1">4.5</span>
                </div>
                <span className="text-gray-500">(123 avis)</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline gap-4">
                <span className="text-2xl font-semibold text-dark-gray">99,99 €</span>
                <span className="text-lg text-gray-500 line-through">129,99 €</span>
              </div>
              <span className="inline-block bg-soft-gold text-white px-3 py-1 rounded-full text-sm">
                -23%
              </span>
            </div>

            <p className="text-gray-600">
              Description du produit...
            </p>

            <div className="flex gap-4">
              <button className="flex-1 bg-light-turquoise hover:bg-soft-gold text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Ajouter au panier
              </button>
              <button className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};