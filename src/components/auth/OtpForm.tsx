import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';


interface OtpFormProps {
  isActivation: boolean;  // ou le type approprié
  telephone: string;      // ou le type approprié
}
// export const OtpForm = ({ isActivation, telephone }) => {
  
  export const OtpForm: React.FC<OtpFormProps> = ({isActivation, telephone}) => {
  
  const [newPassword, setNewPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { activeOrChangePassword } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await activeOrChangePassword(newPassword, confirmPassword, telephone, otp, isActivation);
      navigate('/compte');
    } catch (err) {
      setError("Une erreur s'est produite lors de l'activation " + err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="otp" className="block text-sm font-medium text-dark-gray">
          Mon code OTP
        </label>
        <input
          id="otp"
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-light-turquoise focus:outline-none focus:ring-1 focus:ring-light-turquoise"
        />
      </div>

       <div>
        <label htmlFor="newPassword" className="block text-sm font-medium text-dark-gray">
          Nouveau mot de passe
        </label>
        <input
          id="newPassword"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-light-turquoise focus:outline-none focus:ring-1 focus:ring-light-turquoise"
          required
        />
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-dark-gray">
        Confirmez le mot de passe
        </label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
        {loading ? 'En cours...' : "Valider"}
      </button>
    </form>
  );
};