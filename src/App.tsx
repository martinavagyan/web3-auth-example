import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import {
  GlowWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import React, { FC, ReactNode, useMemo } from 'react';
import { AuthProvider } from '@heliofi/web3-auth-ui';
import { AuthPayload, validate } from '@heliofi/web3-auth-common';

import { Profile } from './profile';

export const App: FC = () => {
  return (
    <Context>
      <Content />
    </Context>
  );
};

const Context: FC<{ children: ReactNode }> = ({ children }) => {
  const network = WalletAdapterNetwork.Devnet;

  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new GlowWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new TorusWalletAdapter(),
    ],
    [network]
  );

  // const getToken = async (payload: AuthPayload): Promise<string> => {
  //   try {
  //     const body = JSON.stringify(payload);
  //     console.log(body);
  //     console.log('isValid: ', validate(payload));
  //     const res = await fetch('https://test.api.hel.io/connect', {
  //       method: 'POST',
  //       body,
  //       headers: {
  //         'content-type': 'application/json',
  //       },
  //     });
  //     const { token } = await res.json();
  //     console.log(token);
  //     return token;
  //   } catch (e) {
  //     console.error(e);
  //     return '';
  //   }
  // };

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <AuthProvider apiUrl={'https://test.api.hel.io/connect'}>
            <div> {children}</div>
            <br />
            <br />
            <Profile />
          </AuthProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

const Content: FC = () => {
  return (
    <>
      <WalletMultiButton />
    </>
  );
};
