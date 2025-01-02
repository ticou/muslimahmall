import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { UpdateProfileForm } from '../../components/auth/UpdateProfileForm';
import { UpdatePasswordForm } from '../../components/auth/UpdatePasswordForm';

export const AccountPage = () => {
  const { user, signOut } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-playfair font-bold text-dark-gray mb-8">
        Mon compte
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-playfair font-semibold text-dark-gray mb-6">
            Informations personnelles
          </h2>
          <UpdateProfileForm />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-playfair font-semibold text-dark-gray mb-6">
            Modifier le mot de passe
          </h2>
          <UpdatePasswordForm />
        </div>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() => signOut()}
          className="text-light-turquoise hover:text-soft-gold"
        >
          Se déconnecter
        </button>
      </div>
    </div>
  );
};