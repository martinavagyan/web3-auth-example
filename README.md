> Web3 auth example

This project is an example of how to sign with any Solana wallet

Includes:
- React components for signing with any Solana wallet.
- Authentication is done by signing unix timestamp with logged in wallet, sending it to BE which will respond with JWT.
- JWT from BE is stored in local storage with expiration.
- The JWT payload is decoded and can be accessed via react context.
