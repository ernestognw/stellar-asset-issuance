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
const publishICOOffer = async (assetName, amount, price) => {};

module.exports = publishICOOffer;
