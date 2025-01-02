import React from 'react';
import { useParams } from 'react-router-dom';
import { ProductCard } from '../components/products/ProductCard';

export const EventPage = () => {
  const { eventId } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
        <div className="aspect-[3/1] relative">
          <img
            src="https://images.unsplash.com/photo-1631233859262-0d7b12ea7d4c"
            alt="Événement"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h1 className="font-playfair text-4xl mb-4">Titre de l'événement</h1>
            <p className="text-lg text-white/90 mb-4">Description de l'événement...</p>
            <div className="flex items-center gap-4">
              <span className="bg-soft-gold px-4 py-2 rounded-full text-lg">
                -30%
              </span>
              <span className="text-lg">
                Jusqu'au {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Liste des produits de l'événement */}
      </div>
    </div>
  );
};