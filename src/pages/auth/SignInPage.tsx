import React from 'react';
import { Link } from 'react-router-dom';
import { SignInForm } from '../../components/auth/SignInForm';

export const SignInPage = () => {
  return (
    <div className="min-h-[calc(100vh-136px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-playfair font-bold text-dark-gray">
            Connexion
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Ou{' '}
            <Link to="/inscription" className="text-light-turquoise hover:text-soft-gold">
              créez un compte
            </Link>
          </p>
        </div>

        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <SignInForm />

          <div className="mt-6">
            <div className="text-sm text-center">
              <Link to="/mot-de-passe-oublie" className="text-light-turquoise hover:text-soft-gold">
                Mot de passe oublié ?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};