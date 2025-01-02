import { Category } from '../types/shop';

export const SHOP_CATEGORIES: Category[] = [
  {
    id: "vetements",
    title: "Vêtements Modestes",
    description: "Découvrez notre sélection de vêtements islamiques élégants et modernes",
    shops: [
      {
        id: "modest-fashion",
        name: "Modest Fashion",
        image: "https://images.unsplash.com/photo-1631233859262-0d7b12ea7d4c?auto=format&fit=crop&q=80&w=400",
        description: "Des créations modernes et élégantes pour la femme musulmane contemporaine",
        category: "vetements",
        rating: 4.8,
        totalSales: 1234,
        totalReviews: 856,
        shopType: "PREMIUM",
        tags: ["Abayas", "Robes", "Sur mesure"],
        joinedDate: "2021-03-15"
      },
      {
        id: "hijab-elegance",
        name: "Hijab Élégance",
        image: "https://images.unsplash.com/photo-1630312465936-4c57c2be7c1d?auto=format&fit=crop&q=80&w=400",
        description: "Votre destination pour des hijabs raffinés et des accessoires assortis",
        category: "vetements",
        rating: 4.6,
        totalSales: 2156,
        totalReviews: 1203,
        shopType: "VERIFIED",
        tags: ["Hijabs", "Accessoires", "Premium"],
        joinedDate: "2020-08-22"
      },
      {
        id: "abayas-co",
        name: "Abayas & Co",
        image: "https://images.unsplash.com/photo-1631233546829-2c5c6825b6ce?auto=format&fit=crop&q=80&w=400",
        description: "Des abayas sur mesure alliant tradition et modernité",
        category: "vetements",
        rating: 4.9,
        totalSales: 3421,
        totalReviews: 2105,
        shopType: "PREMIUM",
        tags: ["Abayas", "Luxe", "Sur mesure"],
        joinedDate: "2019-11-30"
      },
      {
        id: "modern-muslimah",
        name: "Modern Muslimah",
        image: "https://images.unsplash.com/photo-1631233546061-29d4f60a9aa9?auto=format&fit=crop&q=80&w=400",
        description: "La mode islamique contemporaine pour toutes les occasions",
        category: "vetements",
        rating: 4.5,
        totalSales: 987,
        totalReviews: 543,
        shopType: "VERIFIED",
        tags: ["Casual", "Sport", "Moderne"],
        joinedDate: "2022-01-15"
      }
    ]
  },
  {
    id: "accessoires",
    title: "Accessoires",
    description: "Complétez votre style avec nos accessoires soigneusement sélectionnés",
    shops: [
      {
        id: "bijoux-halal",
        name: "Bijoux Halal",
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=400",
        description: "Des bijoux élégants respectant les principes islamiques",
        category: "accessoires",
        rating: 4.7,
        totalSales: 1876,
        totalReviews: 1243,
        shopType: "PREMIUM",
        tags: ["Bijoux", "Argent", "Or"],
        joinedDate: "2020-05-10"
      },
      {
        id: "sacs-plus",
        name: "Sacs & Plus",
        image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&q=80&w=400",
        description: "Des sacs et accessoires pour compléter votre style",
        category: "accessoires",
        rating: 4.4,
        totalSales: 945,
        totalReviews: 632,
        shopType: "STANDARD",
        tags: ["Sacs", "Accessoires", "Cuir"],
        joinedDate: "2022-03-20"
      },
      {
        id: "modest-accessories",
        name: "Modest Accessories",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=400",
        description: "Accessoires modestes pour tous les jours",
        category: "accessoires",
        rating: 4.3,
        totalSales: 756,
        totalReviews: 421,
        shopType: "STANDARD",
        tags: ["Accessoires", "Quotidien", "Abordable"],
        joinedDate: "2022-06-15"
      },
      {
        id: "beauty-essentials",
        name: "Beauty Essentials",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=400",
        description: "Produits de beauté halal et soins naturels",
        category: "accessoires",
        rating: 4.8,
        totalSales: 2341,
        totalReviews: 1567,
        shopType: "PREMIUM",
        tags: ["Beauté", "Bio", "Halal"],
        joinedDate: "2021-01-05"
      }
    ]
  },
  {
    id: "maison",
    title: "Maison & Décoration",
    description: "Créez un intérieur harmonieux avec notre collection de décoration islamique",
    shops: [
      {
        id: "islamic-art",
        name: "Islamic Art Home",
        image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=400",
        description: "Art islamique contemporain et calligraphie pour votre intérieur",
        category: "maison",
        rating: 4.9,
        totalSales: 1567,
        totalReviews: 892,
        shopType: "PREMIUM",
        tags: ["Art", "Calligraphie", "Décoration"],
        joinedDate: "2020-01-15"
      },
      {
        id: "prayer-essentials",
        name: "Prayer Essentials",
        image: "https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&q=80&w=400",
        description: "Tout le nécessaire pour la prière et la méditation",
        category: "maison",
        rating: 4.7,
        totalSales: 2890,
        totalReviews: 1456,
        shopType: "VERIFIED",
        tags: ["Prière", "Tapis", "Accessoires"],
        joinedDate: "2021-06-20"
      },
      {
        id: "modest-home",
        name: "Modest Home",
        image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=400",
        description: "Décoration d'intérieur moderne et modeste",
        category: "maison",
        rating: 4.5,
        totalSales: 1234,
        totalReviews: 678,
        shopType: "STANDARD",
        tags: ["Décoration", "Moderne", "Intérieur"],
        joinedDate: "2022-02-10"
      },
      {
        id: "ramadan-decor",
        name: "Ramadan Décor",
        image: "https://images.unsplash.com/photo-1619460573582-0a8f8e9c87bb?auto=format&fit=crop&q=80&w=400",
        description: "Décorations spéciales pour Ramadan et Aïd",
        category: "maison",
        rating: 4.8,
        totalSales: 3456,
        totalReviews: 1890,
        shopType: "PREMIUM",
        tags: ["Ramadan", "Fêtes", "Décoration"],
        joinedDate: "2021-03-01"
      }
    ]
  },
  {
    id: "livres",
    title: "Livres & Éducation",
    description: "Enrichissez vos connaissances avec notre sélection de livres islamiques",
    shops: [
      {
        id: "islamic-books",
        name: "Islamic Books",
        image: "https://images.unsplash.com/photo-1583329650309-e8be57ded730?auto=format&fit=crop&q=80&w=400",
        description: "Large sélection de livres islamiques en français",
        category: "livres",
        rating: 4.6,
        totalSales: 4567,
        totalReviews: 2345,
        shopType: "PREMIUM",
        tags: ["Livres", "Éducation", "Islam"],
        joinedDate: "2020-09-15"
      },
      {
        id: "kids-learning",
        name: "Kids Learning Corner",
        image: "https://images.unsplash.com/photo-1588416936097-41850ab3d86d?auto=format&fit=crop&q=80&w=400",
        description: "Matériel éducatif islamique pour enfants",
        category: "livres",
        rating: 4.9,
        totalSales: 3456,
        totalReviews: 1678,
        shopType: "VERIFIED",
        tags: ["Enfants", "Éducation", "Jeux"],
        joinedDate: "2021-08-20"
      },
      {
        id: "quran-store",
        name: "Quran Store",
        image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&q=80&w=400",
        description: "Corans et livres d'apprentissage",
        category: "livres",
        rating: 4.8,
        totalSales: 5678,
        totalReviews: 3456,
        shopType: "PREMIUM",
        tags: ["Coran", "Apprentissage", "Livres"],
        joinedDate: "2019-12-01"
      },
      {
        id: "islamic-library",
        name: "Islamic Library",
        image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=400",
        description: "Bibliothèque islamique en ligne",
        category: "livres",
        rating: 4.7,
        totalSales: 2345,
        totalReviews: 1234,
        shopType: "VERIFIED",
        tags: ["Livres", "Digital", "Éducation"],
        joinedDate: "2021-01-10"
      }
    ]
  },
  {
    id: "parfums",
    title: "Parfums & Senteurs",
    description: "Des parfums sans alcool et des senteurs naturelles",
    shops: [
      {
        id: "attar-collection",
        name: "Attar Collection",
        image: "https://images.unsplash.com/photo-1588405765997-02255aec9f41?auto=format&fit=crop&q=80&w=400",
        description: "Collection de parfums traditionnels et modernes",
        category: "parfums",
        rating: 4.9,
        totalSales: 3456,
        totalReviews: 1789,
        shopType: "PREMIUM",
        tags: ["Parfums", "Attar", "Luxe"],
        joinedDate: "2020-03-15"
      },
      {
        id: "natural-scents",
        name: "Natural Scents",
        image: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&q=80&w=400",
        description: "Parfums naturels et huiles essentielles",
        category: "parfums",
        rating: 4.7,
        totalSales: 2345,
        totalReviews: 1234,
        shopType: "VERIFIED",
        tags: ["Naturel", "Bio", "Huiles"],
        joinedDate: "2021-05-20"
      },
      {
        id: "luxury-perfumes",
        name: "Luxury Perfumes",
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=400",
        description: "Parfums de luxe sans alcool",
        category: "parfums",
        rating: 4.8,
        totalSales: 4567,
        totalReviews: 2345,
        shopType: "PREMIUM",
        tags: ["Luxe", "Sans alcool", "Premium"],
        joinedDate: "2020-11-01"
      },
      {
        id: "oriental-scents",
        name: "Oriental Scents",
        image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=400",
        description: "Parfums orientaux authentiques",
        category: "parfums",
        rating: 4.6,
        totalSales: 1890,
        totalReviews: 967,
        shopType: "VERIFIED",
        tags: ["Oriental", "Traditionnel", "Authentique"],
        joinedDate: "2021-09-10"
      }
    ]
  },
  {
    id: "alimentation",
    title: "Alimentation Halal",
    description: "Produits alimentaires certifiés halal et spécialités orientales",
    shops: [
      {
        id: "halal-gourmet",
        name: "Halal Gourmet",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=400",
        description: "Épicerie fine halal et produits gourmets",
        category: "alimentation",
        rating: 4.8,
        totalSales: 5678,
        totalReviews: 3456,
        shopType: "PREMIUM",
        tags: ["Gourmet", "Halal", "Épicerie fine"],
        joinedDate: "2020-06-15"
      },
      {
        id: "dates-honey",
        name: "Dates & Honey",
        image: "https://images.unsplash.com/photo-1587696049826-6796c128f6b6?auto=format&fit=crop&q=80&w=400",
        description: "Dattes premium et miel naturel",
        category: "alimentation",
        rating: 4.9,
        totalSales: 4567,
        totalReviews: 2345,
        shopType: "VERIFIED",
        tags: ["Dattes", "Miel", "Bio"],
        joinedDate: "2021-02-20"
      },
      {
        id: "oriental-delights",
        name: "Oriental Delights",
        image: "https://images.unsplash.com/photo-1547496502-affa22d38842?auto=format&fit=crop&q=80&w=400",
        description: "Pâtisseries orientales et confiseries",
        category: "alimentation",
        rating: 4.7,
        totalSales: 3456,
        totalReviews: 1789,
        shopType: "PREMIUM",
        tags: ["Pâtisserie", "Oriental", "Confiserie"],
        joinedDate: "2020-08-01"
      },
      {
        id: "ramadan-treats",
        name: "Ramadan Treats",
        image: "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&q=80&w=400",
        description: "Spécialités pour le Ramadan",
        category: "alimentation",
        rating: 4.6,
        totalSales: 2345,
        totalReviews: 1234,
        shopType: "VERIFIED",
        tags: ["Ramadan", "Traditionnel", "Festif"],
        joinedDate: "2021-11-10"
      }
    ]
  },
  {
    id: "sport",
    title: "Sport & Bien-être",
    description: "Équipements et vêtements de sport adaptés",
    shops: [
      {
        id: "modest-sport",
        name: "Modest Sport",
        image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=400",
        description: "Vêtements de sport modestes et confortables",
        category: "sport",
        rating: 4.7,
        totalSales: 3456,
        totalReviews: 1789,
        shopType: "PREMIUM",
        tags: ["Sport", "Modeste", "Confort"],
        joinedDate: "2020-07-15"
      },
      {
        id: "swim-modest",
        name: "Swim Modest",
        image: "https://images.unsplash.com/photo-1549476464-37392f717541?auto=format&fit=crop&q=80&w=400",
        description: "Maillots de bain modestes et burkinis",
        category: "sport",
        rating: 4.8,
        totalSales: 2345,
        totalReviews: 1234,
        shopType: "VERIFIED",
        tags: ["Natation", "Burkini", "Plage"],
        joinedDate: "2021-04-20"
      },
      {
        id: "wellness-corner",
        name: "Wellness Corner",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400",
        description: "Produits de bien-être et soins naturels",
        category: "sport",
        rating: 4.6,
        totalSales: 1890,
        totalReviews: 967,
        shopType: "STANDARD",
        tags: ["Bien-être", "Naturel", "Soins"],
        joinedDate: "2022-01-01"
      },
      {
        id: "active-modest",
        name: "Active Modest",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=400",
        description: "Équipements de fitness et accessoires",
        category: "sport",
        rating: 4.5,
        totalSales: 1234,
        totalReviews: 678,
        shopType: "STANDARD",
        tags: ["Fitness", "Équipement", "Accessoires"],
        joinedDate: "2022-03-10"
      }
    ]
  },
  {
    id: "enfants",
    title: "Enfants & Bébés",
    description: "Tout pour les petits musulmans",
    shops: [
      {
        id: "kids-modest",
        name: "Kids Modest",
        image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=400",
        description: "Vêtements modestes pour enfants",
        category: "enfants",
        rating: 4.8,
        totalSales: 4567,
        totalReviews: 2345,
        shopType: "PREMIUM",
        tags: ["Enfants", "Vêtements", "Modeste"],
        joinedDate: "2020-05-15"
      },
      {
        id: "baby-essentials",
        name: "Baby Essentials",
        image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&q=80&w=400",
        description: "Tout pour bébé selon les principes islamiques",
        category: "enfants",
        rating: 4.9,
        totalSales: 3456,
        totalReviews: 1789,
        shopType: "VERIFIED",
        tags: ["Bébé", "Soins", "Essentiels"],
        joinedDate: "2021-03-20"
      },
      {
        id: "islamic-toys",
        name: "Islamic Toys",
        image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&q=80&w=400",
        description: "Jouets éducatifs islamiques",
        category: "enfants",
        rating: 4.7,
        totalSales: 2345,
        totalReviews: 1234,
        shopType: "PREMIUM",
        tags: ["Jouets", "Éducatif", "Islam"],
        joinedDate: "2020-09-01"
      },
      {
        id: "kids-prayer",
        name: "Kids Prayer",
        image: "https://images.unsplash.com/photo-1602030028438-4cf153cbae9e?auto=format&fit=crop&q=80&w=400",
        description: "Articles de prière pour enfants",
        category: "enfants",
        rating: 4.6,
        totalSales: 1890,
        totalReviews: 967,
        shopType: "VERIFIED",
        tags: ["Prière", "Enfants", "Accessoires"],
        joinedDate: "2021-07-10"
      }
    ]
  }
];