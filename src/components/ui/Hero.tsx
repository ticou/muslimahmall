import React from 'react';
import { Carousel } from './Carousel';

const FEATURED_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1631233859262-0d7b12ea7d4c?auto=format&fit=crop&q=80&w=1600",
    title: "Bienvenue sur MuslimahMall",
    description: "Découvrez notre sélection exclusive de boutiques islamiques féminines",
    buttonText: "Découvrir",
    buttonLink: "#",
  },
  {
    image: "https://images.unsplash.com/photo-1630312465936-4c57c2be7c1d?auto=format&fit=crop&q=80&w=1600",
    title: "Nouvelle Collection Hijabs",
    description: "Des styles modernes et élégants pour toutes les occasions",
    buttonText: "Voir la collection",
    buttonLink: "#",
  },
  {
    image: "https://images.unsplash.com/photo-1631233546829-2c5c6825b6ce?auto=format&fit=crop&q=80&w=1600",
    title: "Abayas Exclusives",
    description: "Découvrez nos créations uniques et raffinées",
    buttonText: "Explorer",
    buttonLink: "#",
  },
];

export const Hero = () => {
  return <Carousel slides={FEATURED_SLIDES} />;
};