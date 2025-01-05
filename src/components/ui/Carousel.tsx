import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface CarouselProps {
  slides: {
    image: string;
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
  }[];
  autoPlayInterval?: number;
}

export const Carousel = ({ slides, autoPlayInterval = 5000 }: CarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [slides.length, autoPlayInterval]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative h-[250px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={cn(
            "absolute top-0 left-0 w-full h-full transition-opacity duration-500",
            index === currentSlide ? "opacity-100" : "opacity-0"
          )}
          style={{
            // background: `linear-gradient(to right, rgba(250, 218, 221, 0.9), rgba(255, 245, 225, 0.9)), url(${slide.image})`,
            background: `url(${slide.image})`,
            // backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="max-w-xl">
              <h1 className="font-playfair text-3xl md:text-4xl text-soft-gold mb-2">
                {slide.title}
              </h1>
              <p className="text-white text-base md:text-lg mb-4">
                {slide.description}
              </p>
              <a
                href={slide.buttonLink}
                className="inline-block bg-light-turquoise hover:bg-soft-gold text-white px-6 py-2 rounded-lg transition-colors duration-300"
              >
                {slide.buttonText}
              </a>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation buttons */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/5 p-2 rounded-full hover:bg-white transition-colors"
      >
        <ChevronLeft className="h-6 w-6 text-dark-gray" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/5 p-2 rounded-full hover:bg-white transition-colors"
      >
        <ChevronRight className="h-6 w-6 text-dark-gray" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-colors",
              index === currentSlide ? "bg-soft-gold" : "bg-white/60 hover:bg-white"
            )}
          />
        ))}
      </div>
    </div>
  );
};