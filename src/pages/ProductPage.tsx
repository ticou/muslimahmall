import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Heart } from 'lucide-react';
import { TRENDING_PRODUCTS, CHEAP_PRODUCTS, TOP_RATED_PRODUCTS } from '../data/products';
import { PRODUCT_REVIEWS } from '../data/reviews';
import { useCart } from '../contexts/CartContext';
import { AddToCartButton } from '../components/products/AddToCartButton';
import { ProductQuantityButton } from '../components/products/ProductQuantityButton';
import { ProductReviews } from '../components/products/ProductReviews';
import { useSEO } from '@/hooks/useSEO';
import { SEO } from '@/components/seo/SEO';
import { ScrollableProductList } from '@/components/home/ScrollableProductList';
import { Collapse } from '@/components/ui/Collapse';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import { FavoriteButton } from '@/components/products/FavoriteButton';
import { SHOP_CATEGORIES } from '@/data/shops';
import { ProductGallery } from '@/components/products/ProductGallery';
import { ShopSummary } from '@/components/shops/ShopSummary';

export const ProductPage = () => {
  const { productId } = useParams();
  const { state } = useCart();
  const { generateProductSchema } = useSEO();
  const { recentlyViewed, addProduct } = useRecentlyViewed();

  // Combiner tous les produits
  const allProducts = [...TRENDING_PRODUCTS, ...CHEAP_PRODUCTS, ...TOP_RATED_PRODUCTS];
  const product = allProducts.find(p => p.id === productId);


   
  useEffect(() => {
    if (product) {
      addProduct(product);
    }
  }, [product, addProduct]);


  if (!product) {
    return <div>Produit non trouvé</div>;
  }


  // Générer plusieurs images pour la galerie (simulation)
  const productImages = [
    product.image,
    product.image.replace('w=400', 'w=401'),
    product.image.replace('w=400', 'w=402'),
    product.image.replace('w=400', 'w=403')
  ];


  // Trouver la boutique du produit
  const shop = SHOP_CATEGORIES.flatMap(cat => cat.shops).find(s => s.id === product.shopId);
  

  const isInCart = state.items.some(item => item.product.id === product.id);
  const reviews = PRODUCT_REVIEWS[product.id] || [];


   // Trouver les produits similaires
  const similarProducts = allProducts.filter(p => 
    p.id !== product.id && (
      p.category === product.category ||
      p.tags.some(tag => product.tags.includes(tag))
    )
  ).slice(0, 8);

  // Filtrer les produits récemment vus (exclure le produit actuel)
  const recentProducts = recentlyViewed.filter(p => p.id !== product.id);


  const schema = generateProductSchema(product);

  return (
    
    <>
      <SEO
        title={product.name}
        description={product.description}
        keywords={[...product.tags, product.category]}
        image={product.image}
        type="product"
      />
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    <div className="container mx-auto px-4 py-8">
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Image du produit */}
          {/* <div className="aspect-square rounded-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            </div> */}
            

          {/* Galerie d'images */}
          <ProductGallery images={productImages} name={product.name} />


          {/* Détails du produit */}
          <div className="space-y-6">
            <div>
              <h1 className="font-playfair text-3xl text-dark-gray mb-2">{product.name}</h1>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <Star className="w-5 h-5 fill-soft-gold text-soft-gold" />
                  <span className="ml-1">{product.rating}</span>
                </div>
                <span className="text-gray-500">({product.totalReviews} avis)</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline gap-4">
                <span className="text-2xl font-semibold text-dark-gray">
                  {product.price.toLocaleString()}€
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">
                    {product.originalPrice.toLocaleString()}€
                  </span>
                )}
              </div>
              {product.discount && (
                <span className="inline-block bg-soft-gold text-white px-3 py-1 rounded-full text-sm">
                  -{product.discount}%
                </span>
              )}
            </div>

            <p className="text-gray-600">
              {product.description}
            </p>

            <div className="flex gap-4">
              {isInCart ? (
                <ProductQuantityButton
                  product={product}
                  className="flex-1 py-3"
                />
              ) : (
                <AddToCartButton
                  product={product}
                  className="flex-1 py-3 rounded-lg"
                />
                )}
                
              <FavoriteButton product={product} />

              {/* <button className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Heart className="w-5 h-5" />
              </button> */}
            </div>

            <div className="pt-6 border-t">
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          </div>
          {/* Résumé de la boutique */}
        {shop && (
          <div className="border-t p-6">
            <h2 className="font-playfair text-xl text-dark-gray mb-4">Vendu par</h2>
            <ShopSummary shop={shop} />
          </div>
        )}
      </div>

      {/* Section des avis */}
      {/* <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="font-playfair text-2xl text-dark-gray mb-6">Avis clients</h2>
        <ProductReviews reviews={reviews} />
        </div> */}
      
      {/* Section des avis */}
      <Collapse title={`Avis clients (${reviews.length})`} className="mb-8">
        <ProductReviews reviews={reviews} productId={product.id} />
      </Collapse>
        

         {/* Produits similaires */}
      {similarProducts.length > 0 && (
        <div className="mb-8">
          <ScrollableProductList
            title="Produits similaires"
            products={similarProducts}
          />
        </div>
      )}

      {/* Produits récemment vus */}
      {recentProducts.length > 0 && (
        <div className="mb-8">
          <ScrollableProductList
            title="Récemment consultés"
            products={recentProducts}
          />
        </div>
      )}



    </div>
    </>
  );
};