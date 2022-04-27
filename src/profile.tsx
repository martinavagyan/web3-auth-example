import React from 'react';
import { useAuthContext } from './auth/AuthProvider';
import { useConnection } from '@solana/wallet-adapter-react';

export const Profile = () => {
  const { payload } = useAuthContext();
  useConnection;

  return (
    <div>
      <span style={{ color: 'white' }}>{payload && JSON.stringify(payload)}</span>
    </div>
  );
};
