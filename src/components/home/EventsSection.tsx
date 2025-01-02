import React, { useRef } from 'react';
import { Event } from '../../types/event';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface EventsSectionProps {
  events: Event[];
}

export const EventsSection = ({ events }: EventsSectionProps) => {
  const scrollContainer = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainer.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollContainer.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="font-playfair text-2xl text-dark-gray">Événements en cours</h2>
      <div className="relative">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-md opacity-0 hover:opacity-100 transition-opacity"
        >
          <ChevronLeft className="w-6 h-6 text-dark-gray" />
        </button>

        <div
          ref={scrollContainer}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
        >
          {events.map((event) => (
            <Link
              key={event.id}
              to={`/evenement/${event.id}`}
              className="flex-none w-[400px] relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="aspect-[16/9] relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-playfair text-xl mb-2">{event.title}</h3>
                  <p className="text-sm text-white/90 line-clamp-2">{event.description}</p>
                  <div className="mt-2 flex items-center gap-2">
                    {event.discount > 0 && (
                      <span className="bg-soft-gold px-2 py-1 rounded-full text-sm">
                        -{event.discount}%
                      </span>
                    )}
                    <span className="text-sm">
                      Jusqu'au {new Date(event.endDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-md opacity-0 hover:opacity-100 transition-opacity"
        >
          <ChevronRight className="w-6 h-6 text-dark-gray" />
        </button>
      </div>
    </div>
  );
};