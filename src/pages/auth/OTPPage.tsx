import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { OtpForm } from '@/components/auth/OtpForm';


// interface OTPPageProps {
//   isActivation?: boolean;  // ou le type approprié
//   telephone?: string;      // ou le type approprié
// }
export const OTPPage = () => {
// export const OTPPage: React.FC<OTPPageProps> = ({isActivation, telephone}) => {
const location = useLocation();
  const { isActivation, telephone } = location.state || {};

  return (
    <div className="min-h-[calc(100vh-136px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-playfair font-bold text-dark-gray">
            {isActivation ? "Finalisez la création de votre compte" :"Changez votre mot de passe"}
          </h2>
          
        </div>

        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <OtpForm isActivation={isActivation??false} telephone={telephone??""} />
        </div>
      </div>
    </div>
  );
};