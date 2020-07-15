const StellarSDK = require('stellar-sdk');
const { server } = require('../../api');
const { distributor, issuer } = require('../../config');

/**
 * @description
 * Complete using issuer account to make a transaction with a mangeSellOffer
 * operation in which the distributor starts the ICO and start to receive
 * payments in native asset in exchange
 *
 * @param assetName alphanumeric4 asset code to send
 * @param amount total amount to offer
 * @param price the amount of native assets to receive in exchange of the asset
 */
const publishICOOffer = async (assetName, amount, price) => {
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
      StellarSDK.Operation.manageSellOffer({
        selling: new StellarSDK.Asset(assetName, issuer.public),
        buying: StellarSDK.Asset.native(),
        amount: amount.toString(),
        price
      })
    )
    .setTimeout(100)
    .build();

  transaction.sign(distributorKeyPair);

  await server.submitTransaction(transaction);

  console.info(`ICO published, selling ${amount} ${assetName}`);
};

module.exports = publishICOOffer;
