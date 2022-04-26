const tokenName = 'AUTH_TOKEN';

export const getJwtLocalStorage = (): undefined | string => {
  return window.localStorage.getItem(tokenName) ?? undefined;
};

export const setJwtLocalStorage = (token: string): void => {
  return window.localStorage.setItem(tokenName, token);
};

export const removeJwtLocalStorage = (): void => {
  return window.localStorage.removeItem(tokenName);
};
