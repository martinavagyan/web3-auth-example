import React from 'react';
import { useAuthContext } from './auth/AuthProvider';

export const Profile = () => {
  const { payload } = useAuthContext();
  return (
    <div>
      <span style={{ color: 'white' }}>{payload && JSON.stringify(payload)}</span>
    </div>
  );
};
