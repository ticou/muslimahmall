import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../../types/product";

interface SearchResultsProps {
  results: Product[];
  onResultClick: () => void;
}

export const SearchResults = ({
  results,
  onResultClick,
}: SearchResultsProps) => {
  if (results.length === 0) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
      {results.map((product) => (
        <Link
          key={product.id}
          to={`/produit/${product.id}`}
          className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
          onClick={onResultClick}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-16 h-16 object-cover rounded-md"
          />
          <div>
            <h3 className="font-medium text-dark-gray">{product.name}</h3>
            <p className="text-sm text-gray-500">
              {product.price.toLocaleString()}€
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};
