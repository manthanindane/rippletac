"use client"

import  { useState } from 'react';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode"; 

interface DecodedUser {
  email: string;
  name: string;
  picture: string;
  sub: string;
  given_name?: string;
  family_name?: string;
  email_verified?: boolean;
  // Add other fields you expect from Google
}

const GoogleSignIn = () => {
  const [user, setUser] = useState<DecodedUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSuccess = (credentialResponse: CredentialResponse) => {
    setIsLoading(true);
    setError(null);

    try {
      if (credentialResponse.credential) {
        const decoded = jwtDecode<DecodedUser>(credentialResponse.credential);
        setUser(decoded);

        localStorage.setItem('user', JSON.stringify(decoded));

        
      }
    } catch (err) {
      setError('Failed to process login. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginError = () => {
    setError('Login failed. Please try again.');
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign in with Google</h2>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={handleLoginError}
              useOneTap
              theme="filled_blue"
              shape="rectangular"
            />
          </div>
        )}

        {user && (
          <div className="mt-6 text-center">
            <img 
              src={user.picture} 
              alt={user.name} 
              className="w-16 h-16 rounded-full mx-auto mb-2"
            />
            <p className="font-semibold">{user.name}</p>
            <p className="text-gray-600">{user.email}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoogleSignIn;


