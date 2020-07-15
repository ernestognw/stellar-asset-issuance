# Stellar Asset Issuance

This is an example of how to issue a new asset in Stellar Network, just follow the instructions below:

1. Copy .env.example into a .env
2. Go to [Stellar Laboratory](https://laboratory.stellar.org/#account-creator?network=test) and create 2 accounts, copy their public and secret keys to .env for Issuer and Distributor
3. Fund those accounts using Stellar Friendbot

At this point, you can run `npm start` to interact with the CLI prepared for this example.

To show how it works, run the scripts in the following order:

1. Trust issuer (Distributor)
2. Generate tokens (Issuer)
3. Limit supply (Issuer)
4. Publish ICO OFfer (Distributor)

## Cheers!