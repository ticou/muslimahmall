import { Event } from "../types/event";

export const CURRENT_EVENTS: Event[] = [
  {
    id: "ramadan-sale",
    title: "Spécial Ramadan",
    description: "Préparez-vous pour le Ramadan avec notre sélection spéciale",
    image:
      "https://images.unsplash.com/photo-1619460573582-0a8f8e9c87bb?auto=format&fit=crop&q=80&w=1600",
    startDate: "2024-03-01",
    endDate: "2024-03-31",
    discount: 30,
    productIds: ["abaya-premium-1", "hijab-soie-1", "parfum-rose-1"],
    type: "SALE",
  },
  {
    id: "eid-collection",
    title: "Collection Aïd",
    description: "Découvrez notre nouvelle collection pour l'Aïd",
    image:
      "https://images.unsplash.com/photo-1631233546829-2c5c6825b6ce?auto=format&fit=crop&q=80&w=1600",
    startDate: "2024-04-01",
    endDate: "2024-04-15",
    discount: 0,
    productIds: [
      "robe-soiree-1",
      "parfum-collection-1",
      "hijab-soie-premium-1",
    ],
    type: "NEW_COLLECTION",
  },
  {
    id: "flash-sale",
    title: "Vente Flash Hijabs",
    description: "48h de prix exceptionnels sur les hijabs",
    image:
      "https://images.unsplash.com/photo-1630312465936-4c57c2be7c1d?auto=format&fit=crop&q=80&w=1600",
    startDate: "2024-03-15",
    endDate: "2024-03-17",
    discount: 50,
    productIds: ["hijab-basic-1", "hijab-soie-1", "sous-hijab-1"],
    type: "FLASH_SALE",
  },
  {
    id: "modest-fashion-week",
    title: "Semaine de la Mode Modeste",
    description: "Les dernières tendances de la mode modeste",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=1600",
    startDate: "2024-03-20",
    endDate: "2024-03-27",
    discount: 20,
    productIds: ["abaya-couture-1", "kimono-moderne-1", "jilbab-casual-1"],
    type: "NEW_COLLECTION",
  },
  {
    id: "beauty-week",
    title: "Semaine de la Beauté",
    description: "Tous nos produits de beauté halal en promotion",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=1600",
    startDate: "2024-03-10",
    endDate: "2024-03-17",
    discount: 25,
    productIds: ["attar-exclusive-1", "miswak-1", "attar-mini-1"],
    type: "SALE",
  },
  {
    id: "accessories-sale",
    title: "Festival des Accessoires",
    description: "Tous les accessoires à prix réduits",
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=1600",
    startDate: "2024-03-05",
    endDate: "2024-03-12",
    discount: 40,
    productIds: ["broches-hijab-1", "bijoux-set-1", "tasbih-basic-1"],
    type: "SALE",
  },
  {
    id: "premium-week",
    title: "Semaine Premium",
    description: "Nos plus belles pièces de créateurs",
    image:
      "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=1600",
    startDate: "2024-03-25",
    endDate: "2024-04-01",
    discount: 15,
    productIds: ["calligraphie-1", "prayer-set-luxe-1", "coran-collector-1"],
    type: "NEW_COLLECTION",
  },
  {
    id: "perfume-festival",
    title: "Festival des Parfums",
    description: "Une sélection exclusive de parfums sans alcool",
    image:
      "https://images.unsplash.com/photo-1588405765997-02255aec9f41?auto=format&fit=crop&q=80&w=1600",
    startDate: "2024-03-08",
    endDate: "2024-03-15",
    discount: 30,
    productIds: ["parfum-collection-1", "attar-exclusive-1", "attar-mini-1"],
    type: "SALE",
  },
];
