import { useWallet } from '@solana/wallet-adapter-react';
import React, { useEffect, useState } from 'react';
import base58 from 'bs58';
import { apiRequest } from '../mockApi';
import { getAuthenticateMessage, isExpired } from '../common';
import { getJwtLocalStorage, removeJwtLocalStorage, setJwtLocalStorage } from './localStorageService';

export const useAuth = (onAuthFailed?: (error: any) => void) => {
  const { publicKey, signMessage } = useWallet();
  const [token, setToken] = useState<string | undefined>(undefined);
  const [localToken, setLocalToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    const token = getJwtLocalStorage();
    if (token != null && !isExpired(token)) {
      setLocalToken(token);
    } else {
      removeJwtLocalStorage();
    }
  }, []);

  useEffect(() => {
    const connect = async () => {
      if (publicKey == null || signMessage == null) return;
      const message = getAuthenticateMessage();
      const signed = await signMessage(message);
      const token = await apiRequest({ publicKey: publicKey.toBase58(), signature: base58.encode(signed) });
      setLocalToken(token);
      setJwtLocalStorage(token);
    };

    if (localToken == null || isExpired(localToken)) {
      connect().catch((e) => onAuthFailed && onAuthFailed(e));
    }
  }, [localToken, onAuthFailed, publicKey, signMessage]);

  useEffect(() => {
    setToken(localToken);
  }, [localToken]);

  return token;
};
