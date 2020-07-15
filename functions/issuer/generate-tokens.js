const StellarSDK = require('stellar-sdk');
const { server } = require('../../api');
const { distributor, issuer } = require('../../config');

/**
 * @description
 * Complete using issuer account to make a transaction with a payment
 * operation using the tokenCode you setup in trust issuer first operation.
 * Point the transaction to distributor address
 *
 * @param assetName alphanumeric4 asset code to send
 * @param amount total amount to send to distributor
 */
const generateTokens = async (assetName, amount) => {
  const issuerKeyPair = StellarSDK.Keypair.fromSecret(issuer.secret);

  const issuerAccount = await server.loadAccount(issuer.public);

  const txOptions = {
    fee: StellarSDK.BASE_FEE,
    networkPassphrase: StellarSDK.Networks.TESTNET
  };

  const transaction = new StellarSDK.TransactionBuilder(
    issuerAccount,
    txOptions
  )
    .addOperation(
      StellarSDK.Operation.payment({
        destination: distributor.public,
        asset: new StellarSDK.Asset(assetName, issuer.public),
        amount: amount.toString()
      })
    )
    .setTimeout(100)
    .build();

  transaction.sign(issuerKeyPair);

  await server.submitTransaction(transaction);

  console.info(`${amount} tokens generated and sent to distributor`);
};

module.exports = generateTokens;
