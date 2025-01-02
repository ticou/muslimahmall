import React, { useState, useRef, useEffect } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { useSearch } from '../../hooks/useSearch';
import { SearchResults } from './SearchResults';

interface SearchBarProps {
  className?: string;
}

export const SearchBar = ({ className = '' }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { searchResults, searchProducts } = useSearch();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    searchProducts(value);
    setIsOpen(true);
  };

  const handleResultClick = () => {
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Rechercher un produit..."
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-soft-gold"
        />
        <button className="absolute right-2 top-1/2 -translate-y-1/2">
          <SearchIcon className="h-5 w-5 text-dark-gray" />
        </button>
      </div>
      
      {isOpen && (
        <SearchResults
          results={searchResults}
          onResultClick={handleResultClick}
        />
      )}
    </div>
  );
};