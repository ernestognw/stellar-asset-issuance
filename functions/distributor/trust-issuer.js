const StellarSDK = require('stellar-sdk');
const { server } = require('../../api');
const { distributor, issuer } = require('../../config');

/**
 * @description
 * Complete using distributor account to submit a transaction with a
 * 'Change trust' operation that allows distributor to receive a credit payment
 * issued by the issuer
 *
 * @param assetName alphanumeric4 asset code to trust
 * @param trustLimit total amount of assets to be trusted
 */
const trustIssuer = async (assetName, trustLimit) => {
  const distributorKeyPair = StellarSDK.Keypair.fromSecret(distributor.secret);

  const distributorAccount = await server.loadAccount(distributor.public);

  const txOptions = {
    fee: StellarSDK.BASE_FEE,
    networkPassphrase: StellarSDK.Networks.TESTNET
  };

  const transaction = new StellarSDK.TransactionBuilder(
    distributorAccount,
    txOptions
  )
    .addOperation(
      StellarSDK.Operation.changeTrust({
        asset: new StellarSDK.Asset(assetName, issuer.public),
        limit: trustLimit.toString()
      })
    )
    .setTimeout(100)
    .build();

  transaction.sign(distributorKeyPair);

  await server.submitTransaction(transaction);

  console.info(
    `Distributor now trust issuer to receive up to ${trustLimit} ${assetName}`
  );
};

module.exports = trustIssuer;
