import React, { useEffect, useLayoutEffect } from 'react';
import { useAuthContext } from '@heliofi/web3-auth-ui';
import { getMockUserToken } from './authWithMockUser';

export const Profile = () => {
  const { payload, token } = useAuthContext();

  // @exmaple of how to generate random token
  // useLayoutEffect(() => {
  //   getMockUserToken().then((token) => console.log('token: ', token));
  // }, []);

  return (
    <div style={{ width: '400px', background: 'grey' }}>
      {}
      <></>
      <h4>User</h4>
      <br />
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
