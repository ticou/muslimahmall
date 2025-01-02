import React from 'react';
import { useParams } from 'react-router-dom';
import { SHOP_CATEGORIES } from '../data/shops';
import { TRENDING_PRODUCTS, CHEAP_PRODUCTS, TOP_RATED_PRODUCTS } from '../data/products';
import { ShopProducts } from '../components/shop/ShopProducts';
import { SEO } from '@/components/seo/SEO';
import { useSEO } from '@/hooks/useSEO';

export const ShopPage = () => {
  const { shopId } = useParams();
  const shop = SHOP_CATEGORIES.flatMap(cat => cat.shops).find(s => s.id === shopId);
  const { generateShopSchema } = useSEO();

  // Combiner tous les produits
  const allProducts = [...TRENDING_PRODUCTS, ...CHEAP_PRODUCTS, ...TOP_RATED_PRODUCTS];
  
  // Filtrer les produits de la boutique
  const shopProducts = allProducts.filter(product => product.shopId === shopId);

  if (!shop) {
    return <div>Boutique non trouvée</div>;
  }

    const schema = generateShopSchema(shop);

  return (

     <>
      <SEO
        title={shop.name}
        description={shop.description}
        keywords={shop.tags}
        image={shop.image}
        type="store"
      />
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
        <div className="h-64 relative">
          <img
            src={shop.image}
            alt={shop.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2 py-1 rounded-full text-sm ${
                shop.shopType === 'PREMIUM' ? 'bg-soft-gold' :
                shop.shopType === 'VERIFIED' ? 'bg-light-turquoise text-dark-gray' :
                'bg-gray-200 text-gray-700'
              }`}>
                {shop.shopType.charAt(0) + shop.shopType.slice(1).toLowerCase()}
              </span>
              <span className="text-sm">
                Membre depuis {new Date(shop.joinedDate).getFullYear()}
              </span>
            </div>
            <h1 className="font-playfair text-3xl mb-2">{shop.name}</h1>
            <p className="text-white/90 mb-4">{shop.description}</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <span className="font-semibold">{shop.rating.toFixed(1)}</span>
                <span className="text-white/80">({shop.totalReviews} avis)</span>
              </div>
              <span className="text-white/80">{shop.totalSales} ventes</span>
            </div>
          </div>
        </div>
      </div>

      <ShopProducts shop={shop} products={shopProducts} />
    </div></>
  );
};