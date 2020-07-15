const StellarSDK = require('stellar-sdk');
const { server } = require('../../api');
const { issuer } = require('../../config');

/**
 * @description
 * Complete using issuer account to make a transaction with a setOptions
 * operation in which you disable the issuer account, to guarantee
 * there won't be more tokens issued in the future
 */
const limitSupply = async () => {
  const issuerKeyPair = StellarSDK.Keypair.fromSecret(issuer.secret);

  const issuerAccount = await server.loadAccount(issuer.public);

  const thresholds = {
    masterWeight: 0, // Disable secret key
    lowThreshold: 1,
    medThreshold: 1,
    highThreshold: 1
  };

  const txOptions = {
    fee: StellarSDK.BASE_FEE,
    networkPassphrase: StellarSDK.Networks.TESTNET
  };

  let transaction = new StellarSDK.TransactionBuilder(issuerAccount, txOptions)
    .addOperation(StellarSDK.Operation.setOptions(thresholds))
    .setTimeout(100)
    .build();

  transaction.sign(issuerKeyPair);

  await server.submitTransaction(transaction);

  console.info('Issuer account disabled');
};

module.exports = limitSupply;
