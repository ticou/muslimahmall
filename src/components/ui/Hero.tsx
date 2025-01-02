import React from 'react';
import { Carousel } from './Carousel';

const FEATURED_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=1600",
    title: "Bienvenue sur MuslimahMall",
    description: "Découvrez notre sélection exclusive de boutiques islamiques féminines",
    buttonText: "Découvrir",
    buttonLink: "#",
  },
  {
    image: "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?auto=format&fit=crop&q=80&w=1600",
    title: "Nouvelle Collection Hijabs",
    description: "Des styles modernes et élégants pour toutes les occasions",
    buttonText: "Voir la collection",
    buttonLink: "#",
  },
  {
    image: "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?auto=format&fit=crop&q=80&w=1600",
    title: "Abayas Exclusives",
    description: "Découvrez nos créations uniques et raffinées",
    buttonText: "Explorer",
    buttonLink: "#",
  },
];

export const Hero = () => {
  return <Carousel slides={FEATURED_SLIDES} />;
};