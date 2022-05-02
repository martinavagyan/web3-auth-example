import { AuthPayload, getAuthenticatedMessage, validate } from '@heliofi/web3-auth-common';
import { Keypair } from '@solana/web3.js';
import base58 from 'bs58';
import nacl from 'tweetnacl';

export const getMockUserToken = async (url = 'https://test.api.hel.io/connect') => {
  const keypair = Keypair.generate();

  const signature = nacl.sign.detached(getAuthenticatedMessage(), keypair.secretKey);

  const payload: AuthPayload = {
    publicKey: keypair.publicKey.toBase58(),
    signature: base58.encode(signature),
  };

  console.log('isValid', validate(payload));

  const body = JSON.stringify(payload);
  const res = await fetch(url, {
    method: 'POST',
    body,
    headers: {
      'content-type': 'application/json',
    },
  });
  const { token } = await res.json();
  return token;
};
