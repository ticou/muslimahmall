import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../types/auth';
// import authService from '../services/auth.service';
import authService from '../services/offline/auth.service';
import { apiClient } from '@/services/apiClient';
import { RequestAPI, RequestAuthAPI } from '@/types/request';
import { ResponseAPI, ResponseSimpleAPI } from '@/types/response';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  resetPassword: (telephone: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  activeOrChangePassword:(newPassword: string, confirmPassword: string, telephone: string, otp: string, isActivation: boolean)=> Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedUser = authService.getUser();
        if (storedUser && authService.getToken()) {
          const currentUser = await authService.getProfile();
          setUser(currentUser);
        }
      } catch (error) {
          console.error('Error initializing authentication:', error);
        authService.signOut();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const signUp = async (telephone: string, nom: string, prenom: string) => {
    // const response = await authService.signUp(email, password, fullName);
    const type = "CLIENT";
     const userAuthenticated = await apiClient.post<ResponseAPI<User>,  RequestAPI<User>>("/users",
      {
        data: [
          {
          telephone,
           prenom,
           nom,
           type
          }
        ]
      }
    );
    setUser(userAuthenticated.data![0]);
  };


  const signIn = async (telephone: string, password: string) => {

    const userAuthenticated = await apiClient.login({
      telephone: telephone,
      password: password,
    });
    setUser(userAuthenticated);

    // const response = await authService.signIn(telephone, password);
    // setUser(response.user);
  };

  const signOut = async () => {
    // authService.signOut();
     await apiClient.logout();
    setUser(null);
  };

  const resetPassword = async (telephone: string) => {
    await apiClient.post<ResponseAPI<User>, RequestAuthAPI<User>>("/auth/forgot-password",
      {
        data: {
          telephone
        }
      }
    );
    // await authService.resetPassword(telephone);
  };

  const updatePassword = async (password: string) => {
    await authService.updatePassword(password);
  };

  const activeOrChangePassword = async (newPassword: string, confirmPassword: string, telephone: string, otp: string, isActivation: boolean) => {
   const response = await apiClient.post<ResponseSimpleAPI<User>, RequestAuthAPI<User>>(isActivation ?"/auth/activate" : "/auth/reset-password",
      {
        data: {
          telephone,  
          newPassword,
          confirmPassword,
          otp,
        }
      }
      
   );
    
    setUser(response.data!);

    // await authService.updatePassword(password);
  };

  const updateProfile = async (data: Partial<User>) => {
    const updatedUser = await authService.updateProfile(data);
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signUp,
      signIn,
      signOut,
      resetPassword,
      updatePassword,
      updateProfile,
      activeOrChangePassword
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};