import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { UpdateProfileForm } from '../../components/auth/UpdateProfileForm';
import { UpdatePasswordForm } from '../../components/auth/UpdatePasswordForm';

export const ProfilePage = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-playfair font-bold text-dark-gray mb-8">
        Mon profil
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Informations personnelles */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-playfair font-semibold text-dark-gray mb-6">
            Informations personnelles
          </h2>
          <UpdateProfileForm />
        </div>

        {/* Sécurité */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-playfair font-semibold text-dark-gray mb-6">
            Sécurité
          </h2>
          <UpdatePasswordForm />
        </div>
      </div>
    </div>
  );
};