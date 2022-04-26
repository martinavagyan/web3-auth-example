import React, { createContext, FC, useContext, useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import { AuthPayload } from '@heliofi/web3-auth-common';
import { useAuth } from './useAuth';

interface AuthState {
  token?: string;
  payload?: any;
}

export const AuthContext = createContext<AuthState>({});

export const useAuthContext = () => useContext(AuthContext);

interface Props {
  apiRequest: (token: AuthPayload) => Promise<string>;
}

export const AuthProvider: FC<Props> = ({ apiRequest, children }) => {
  const [authState, setAuthState] = useState({});
  const token = useAuth(apiRequest);

  useEffect(() => {
    if (token != null) {
      const payload = jwt.decode(token, { json: true });
      if (payload != null) {
        setAuthState({
          payload,
          token,
        });
      }
    }
  }, [token]);

  return <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>;
};
