import base58 from 'bs58';
import nacl from 'tweetnacl';
import jwt from 'jsonwebtoken';

export interface Payload {
  publicKey: string;
  signature: string;
}

const authenticationDescription = 'Authenticate yourself by singing';

const getNonce = (): number => {
  const secondsRange = 30_000;
  return Math.floor(Date.now() / secondsRange);
};

export const getAuthenticateMessage = (): Uint8Array => {
  return new TextEncoder().encode(`${authenticationDescription}: ${getNonce()}`);
};

export const validate = ({ signature, publicKey }: Payload): boolean => {
  const signatureUint8 = base58.decode(signature);
  const nonceUint8 = getAuthenticateMessage();
  const pubKeyUint8 = base58.decode(publicKey);
  return nacl.sign.detached.verify(nonceUint8, signatureUint8, pubKeyUint8);
};

export const isExpired = (jwtToken: string): boolean => {
  const payload = jwt.decode(jwtToken, { json: true });
  if (payload != null && payload.exp != null) {
    if (Date.now() < payload.exp * 1000) {
      return false;
    }
  }
  return true;
};
