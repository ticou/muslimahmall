import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const ResetPasswordForm = () => {
  const [telephone, setTelephone] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    try {
      await resetPassword(telephone);
      // await resetPassword(email);
      toast.success("Un code a été envoyé sur votre numéro");
      navigate('/otp', { 
        state: { 
          isActivation: false, 
          telephone: telephone 
        }
      });
      // setMessage('Un email de réinitialisation vous a été envoyé');
    } catch (err) {
      setError("Une erreur s'est produite" + err);
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
          type="phone"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-light-turquoise focus:outline-none focus:ring-1 focus:ring-light-turquoise"
          required
        />
      </div>

      {message && (
        <p className="text-green-600 text-sm">{message}</p>
      )}

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-light-turquoise py-2 text-white hover:bg-soft-gold transition-colors disabled:opacity-50"
      >
        {loading ? 'Envoi...' : 'Réinitialiser le mot de passe'}
      </button>
    </form>
  );
};