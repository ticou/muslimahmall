import React from 'react';
import { useParams } from 'react-router-dom';
import { SEO } from '../components/seo/SEO';
import { CURRENT_EVENTS } from '../data/events';
import { TRENDING_PRODUCTS, CHEAP_PRODUCTS, TOP_RATED_PRODUCTS } from '../data/products';
import { ProductCard } from '../components/products/ProductCard';
import { useSEO } from '@/hooks/useSEO';

export const EventPage = () => {
  const { eventId } = useParams();
  const event = CURRENT_EVENTS.find(e => e.id === eventId);
  const { generateEventSchema } = useSEO();

  if (!event) {
    return <div>Événement non trouvé</div>;
  }

  // Combiner tous les produits
  const allProducts = [...TRENDING_PRODUCTS, ...CHEAP_PRODUCTS, ...TOP_RATED_PRODUCTS];
  
  // Filtrer les produits de l'événement
  const eventProducts = allProducts.filter(product => 
    event.productIds.includes(product.id)
  );

    const schema = generateEventSchema(event);


  return (
    <>
      <SEO
        title={event.title}
        description={event.description}
        image={event.image}
        type="event"
      />
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="aspect-[3/1] relative">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h1 className="font-playfair text-4xl mb-4">{event.title}</h1>
              <p className="text-lg text-white/90 mb-4">{event.description}</p>
              <div className="flex items-center gap-4">
                {event.discount > 0 && (
                  <span className="bg-soft-gold px-4 py-2 rounded-full text-lg">
                    -{event.discount}%
                  </span>
                )}
                <span className="text-lg">
                  Jusqu'au {new Date(event.endDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {eventProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};