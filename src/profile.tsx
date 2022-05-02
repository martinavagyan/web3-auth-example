import React from 'react';
import { useAuthContext } from '@heliofi/web3-auth-ui';

export const Profile = () => {
  const { payload } = useAuthContext();

  return (
    <div style={{ width: '400px', height: '200px', background: 'grey' }}>
      <span style={{ color: 'white' }}>{payload && JSON.stringify(payload)}</span>
    </div>
  );
};
