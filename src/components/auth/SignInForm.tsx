import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const SignInForm = () => {
  const [telephone, setTelephone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Récupérer la page précédente depuis le state
 const from = location.state?.from?.pathname || '/';
    
  console.log("from: " + from);
  console.log("location: " + location.pathname);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(telephone, password);
      // Rediriger vers la page précédente après connexion
      navigate(from, { replace: true });
    } catch (err) {
      // setError('Téléphone ou mot de passe incorrect' + err);
      setError(""+ err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="telephone" className="block text-sm font-medium text-dark-gray">
          Téléphone
        </label>
        <input
          id="telephone"
          type="telephone"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-light-turquoise focus:outline-none focus:ring-1 focus:ring-light-turquoise"
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-dark-gray">
          Mot de passe
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-light-turquoise focus:outline-none focus:ring-1 focus:ring-light-turquoise"
          required
        />
      </div>

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-light-turquoise py-2 text-white hover:bg-soft-gold transition-colors disabled:opacity-50"
      >
        {loading ? 'Connexion...' : 'Se connecter'}
      </button>
    </form>
  );
};