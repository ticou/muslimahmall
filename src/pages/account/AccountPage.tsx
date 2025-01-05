import React from 'react';
import { Link } from 'react-router-dom';
import { 
  User, Heart, History, Wallet, Clock,
  CreditCard, Settings, ShoppingBag
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const AccountCard = ({ 
  icon: Icon, 
  title, 
  description, 
  to,
  className = ''
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  to: string;
  className?: string;
}) => (
  <Link 
    to={to}
    className={`block bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all ${className}`}
  >
    <div className="flex items-center gap-4 mb-4">
      <div className="p-3 rounded-full bg-light-beige">
        <Icon className="w-6 h-6 text-soft-gold" />
      </div>
      <h2 className="font-playfair text-xl text-dark-gray">{title}</h2>
    </div>
    <p className="text-gray-600">{description}</p>
  </Link>
);

export const AccountPage = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-playfair font-bold text-dark-gray mb-2">
          Mon compte
        </h1>
        <p className="text-gray-600">
          Bienvenue, {user.fullName}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AccountCard
          icon={User}
          title="Mon profil"
          description="Gérez vos informations personnelles et vos préférences"
          to="/compte/profil"
        />

        <AccountCard
          icon={Heart}
          title="Mes favoris"
          description="Retrouvez tous les produits que vous avez ajoutés à vos favoris"
          to="/compte/favoris"
        />

        <AccountCard
          icon={History}
          title="Mes commandes"
          description="Suivez vos commandes en cours et consultez votre historique d'achats"
          to="/compte/commandes"
        />

        <AccountCard
          icon={Wallet}
          title="Mon wallet"
          description="Gérez votre crédit boutique et consultez l'historique de vos transactions"
          to="/compte/wallet"
        />

        <AccountCard
          icon={Clock}
          title="Mes paiements en cours"
          description="Suivez vos paiements échelonnés et effectuez vos versements"
          to="/compte/paiements"
        />

        {/* <AccountCard
          icon={CreditCard}
          title="Moyens de paiement"
          description="Gérez vos cartes bancaires et autres moyens de paiement"
          to="/compte/paiement-methodes"
        /> */}
      </div>
    </div>
  );
};