import React from 'react';
import { Link } from 'react-router-dom';
import { ResetPasswordForm } from '../../components/auth/ResetPasswordForm';

export const ResetPasswordPage = () => {
  return (
    <div className="min-h-[calc(100vh-136px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-playfair font-bold text-dark-gray">
            Réinitialiser le mot de passe
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Entrez votre téléphone pour recevoir un code de réinitialisation
          </p>
        </div>

        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <ResetPasswordForm />

          <div className="mt-6">
            <div className="text-sm text-center">
              <Link to="/connexion" className="text-light-turquoise hover:text-soft-gold">
                Retour à la connexion
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};