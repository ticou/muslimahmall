import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Constant, HttpMethod } from '@/utils/constants';
import { useAPIRequest } from '@/hooks/use-api-request';
import { ResponseAPI } from '@/types/response';
import { Shop } from '@/types/shop';
import { ROUTES } from '@/config/routes.config';

export const SignUpForm = ({typeUser}:{typeUser:string}) => {
  const [telephone, setTelephone] = useState('');
  const [phone, setPhone] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const {  executeRequest } = useAPIRequest<ResponseAPI<Shop>>();
  const isClient = typeUser == Constant.typeClient;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {

      if (isClient) {
        await signUp(telephone, nom, prenom)
      } else {
        await executeRequest(HttpMethod.POST, Constant.endpointShops, {data : [{phone, nom}]});
      }
      // Pour naviguer avec des paramètres
      navigate(ROUTES.PATH_OTP, { 
        state: { 
          isActivation: true, 
          telephone: isClient ? telephone : phone,
          isClient: isClient
        }
      });
      // navigate('/compte');
    } catch (err) {
      setError("Une erreur s'est produite lors de l'inscription " + err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      
      
      <div>
        <label htmlFor="nom" className="block text-sm font-medium text-dark-gray">
         {isClient ?"Nom" : "Nom boutique"}  
        </label>
        <input
          id="nom"
          type="text"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-light-turquoise focus:outline-none focus:ring-1 focus:ring-light-turquoise"
        />
      </div>

      {isClient && (<div>
        <label htmlFor="prenom" className="block text-sm font-medium text-dark-gray">
          Prénom
        </label>
        <input
          id="prenom"
          type="text"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-light-turquoise focus:outline-none focus:ring-1 focus:ring-light-turquoise"
          required
        />
      </div>)}

      {isClient ? (<div>
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
      </div>) :
      
      (<div>
        <label htmlFor="phone" className="block text-sm font-medium text-dark-gray">
          Téléphone
        </label>
        <input
          id="phone"
          type="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-light-turquoise focus:outline-none focus:ring-1 focus:ring-light-turquoise"
          required
        />
      </div>)}

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-light-turquoise py-2 text-white hover:bg-soft-gold transition-colors disabled:opacity-50"
      >
        {loading ? 'Inscription...' : "S'inscrire"}
      </button>
    </form>
  );
};