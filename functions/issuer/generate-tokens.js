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
const generateTokens = async (assetName, amount) => {};

module.exports = generateTokens;
