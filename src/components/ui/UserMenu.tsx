import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, ChevronDown, LogOut, Settings, History, Heart } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-dark-gray hover:text-soft-gold transition-colors"
      >
        <User className="h-5 w-5" />
        <span>{user.fullName}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
          <Link
            to="/compte"
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
            onClick={() => setIsOpen(false)}
          >
            <Settings className="h-4 w-4" />
            <span>Modifier profil</span>
                  </Link>
                  
        <Link
            to="/compte/favoris"
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
            onClick={() => setIsOpen(false)}
          >
            <Heart className="h-4 w-4" />
            <span>Mes favoris</span>
          </Link>

          <Link
            to="/compte/commandes"
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
            onClick={() => setIsOpen(false)}
          >
            <History className="h-4 w-4" />
            <span>Historique commandes</span>
          </Link>

          <button
            onClick={() => {
              signOut();
              setIsOpen(false);
            }}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 w-full"
          >
            <LogOut className="h-4 w-4" />
            <span>Déconnexion</span>
          </button>
        </div>
      )}
    </div>
  );
};