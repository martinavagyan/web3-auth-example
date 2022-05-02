import React from 'react';
import { useAuthContext } from '@heliofi/web3-auth-ui';

export const Profile = () => {
  const { payload, token } = useAuthContext();

  return (
    <div style={{ width: '400px', background: 'grey' }}>
      {}
      <></>
      <h4>User</h4>
      <span>
        <label>Name: {payload?.name}</label>
      </span>
      <br />
      <span>
        <label>ID: {payload?.id}</label>
      </span>
      <br />
      <br />

      <h4>Token</h4>
      <pre style={{ color: 'white', width: '300px', whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}>{token}</pre>
    </div>
  );
};
