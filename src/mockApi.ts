import { Payload, validate } from './common';
import jwt from 'jsonwebtoken';
const secret = 'shhhhh';

const getOrCreateUser = (publicKey: string): any => {
  return {
    name: 'Test',
    wallet: {
      publicKey,
    },
  };
};

export const apiRequest = (payload: Payload): Promise<any> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const isValid = validate(payload);
      if (isValid) {
        const user = getOrCreateUser(payload.publicKey);
        const token = jwt.sign({ user }, secret, { expiresIn: '2m' });
        resolve(token);
      } else {
        reject('401');
      }
    }, 300);
  });
};

export const apiAuthRequest = async (token: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const payload = await jwt.verify(token, secret);
        resolve(payload);
      } catch (e) {
        console.log('API', e);
        reject(e);
      }
    }, 300);
  });
};
