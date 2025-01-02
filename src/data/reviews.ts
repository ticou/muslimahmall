import { Review } from "../types/reviews";

// Fonction utilitaire pour générer un ID unique
const generateId = () => Math.random().toString(36).substr(2, 9);

// Liste d'avatars pour les avis
const AVATARS = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=100",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=100",
];

// Fonction pour générer des avis aléatoires pour un produit
const generateReviews = (productId: string, productImage: string): Review[] => {
  const numberOfReviews = Math.floor(Math.random() * 3) + 3; // 3 à 5 avis
  return Array.from({ length: numberOfReviews }).map(() => ({
    id: generateId(),
    userId: `user${generateId()}`,
    userName: [
      "Sarah M.",
      "Amina K.",
      "Fatima R.",
      "Leila B.",
      "Nadia H.",
      "Yasmine D.",
      "Sofia L.",
      "Maryam A.",
      "Zainab C.",
      "Aisha T.",
    ][Math.floor(Math.random() * 10)],
    userAvatar:
      Math.random() > 0.3
        ? AVATARS[Math.floor(Math.random() * AVATARS.length)]
        : undefined,
    rating: Math.floor(Math.random() * 2) + 4, // Notes entre 4 et 5
    comment: [
      "Excellent produit, je recommande vivement ! La qualité est au rendez-vous.",
      "Très satisfaite de mon achat. Le rapport qualité-prix est excellent.",
      "Conforme à la description. La livraison était rapide et le produit est parfait.",
      "Superbe qualité, je suis agréablement surprise. Je recommande cette boutique.",
      "Magnifique produit, les finitions sont parfaites. Je reviendrai !",
      "Très belle qualité, je suis ravie de mon achat. Le tissu est agréable à porter.",
      "Produit conforme aux photos, très belle qualité. Je recommande !",
      "Excellent service client et produit de qualité. Parfait !",
      "Je suis très satisfaite de ma commande. Les délais ont été respectés.",
      "Produit haut de gamme, je recommande cette boutique les yeux fermés !",
    ][Math.floor(Math.random() * 10)],
    date: new Date(Date.now() - Math.random() * 7776000000).toISOString(), // Dans les 3 derniers mois
    helpful: Math.floor(Math.random() * 50),
    images: Math.random() > 0.7 ? [productImage] : undefined,
  }));
};

// Génération des avis pour tous les produits
export const PRODUCT_REVIEWS: Record<string, Review[]> = {
  // Produits tendance
  "abaya-premium-1": generateReviews(
    "abaya-premium-1",
    "https://images.unsplash.com/photo-1631233859262-0d7b12ea7d4c?auto=format&fit=crop&q=80&w=400"
  ),
  "hijab-soie-1": generateReviews(
    "hijab-soie-1",
    "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?auto=format&fit=crop&q=80&w=400"
  ),
  "robe-soiree-1": generateReviews(
    "robe-soiree-1",
    "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?auto=format&fit=crop&q=80&w=400"
  ),
  "parfum-rose-1": generateReviews(
    "parfum-rose-1",
    "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?auto=format&fit=crop&q=80&w=400"
  ),
  "abaya-sport-1": generateReviews(
    "abaya-sport-1",
    "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=400"
  ),
  "jilbab-casual-1": generateReviews(
    "jilbab-casual-1",
    "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?auto=format&fit=crop&q=80&w=400"
  ),
  "kimono-moderne-1": generateReviews(
    "kimono-moderne-1",
    "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?auto=format&fit=crop&q=80&w=400"
  ),
  "ensemble-prayer-1": generateReviews(
    "ensemble-prayer-1",
    "https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&q=80&w=400"
  ),
  "abaya-brodee-1": generateReviews(
    "abaya-brodee-1",
    "https://images.unsplash.com/photo-1631233859262-0d7b12ea7d4c?auto=format&fit=crop&q=80&w=400"
  ),
  "hijab-jersey-1": generateReviews(
    "hijab-jersey-1",
    "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?auto=format&fit=crop&q=80&w=400"
  ),

  // Produits pas chers
  "hijab-basic-1": generateReviews(
    "hijab-basic-1",
    "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?auto=format&fit=crop&q=80&w=400"
  ),
  "sous-hijab-1": generateReviews(
    "sous-hijab-1",
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=400"
  ),
  "chaussettes-1": generateReviews(
    "chaussettes-1",
    "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=400"
  ),
  "bonnet-ninja-1": generateReviews(
    "bonnet-ninja-1",
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=400"
  ),
  "broches-hijab-1": generateReviews(
    "broches-hijab-1",
    "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=400"
  ),
  "bandeau-1": generateReviews(
    "bandeau-1",
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=400"
  ),
  "manchons-1": generateReviews(
    "manchons-1",
    "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=400"
  ),
  "tasbih-basic-1": generateReviews(
    "tasbih-basic-1",
    "https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&q=80&w=400"
  ),
  "attar-mini-1": generateReviews(
    "attar-mini-1",
    "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&q=80&w=400"
  ),
  "miswak-1": generateReviews(
    "miswak-1",
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400"
  ),

  // Meilleurs produits
  "abaya-couture-1": generateReviews(
    "abaya-couture-1",
    "https://images.unsplash.com/photo-1631233859262-0d7b12ea7d4c?auto=format&fit=crop&q=80&w=400"
  ),
  "parfum-collection-1": generateReviews(
    "parfum-collection-1",
    "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?auto=format&fit=crop&q=80&w=400"
  ),
  "calligraphie-1": generateReviews(
    "calligraphie-1",
    "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=400"
  ),
  "prayer-set-luxe-1": generateReviews(
    "prayer-set-luxe-1",
    "https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&q=80&w=400"
  ),
  "coran-collector-1": generateReviews(
    "coran-collector-1",
    "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&q=80&w=400"
  ),
  "bijoux-set-1": generateReviews(
    "bijoux-set-1",
    "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=400"
  ),
  "abaya-dubai-1": generateReviews(
    "abaya-dubai-1",
    "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?auto=format&fit=crop&q=80&w=400"
  ),
  "dates-luxury-1": generateReviews(
    "dates-luxury-1",
    "https://images.unsplash.com/photo-1587696049826-6796c128f6b6?auto=format&fit=crop&q=80&w=400"
  ),
  "attar-exclusive-1": generateReviews(
    "attar-exclusive-1",
    "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?auto=format&fit=crop&q=80&w=400"
  ),
  "hijab-soie-premium-1": generateReviews(
    "hijab-soie-premium-1",
    "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?auto=format&fit=crop&q=80&w=400"
  ),
};
