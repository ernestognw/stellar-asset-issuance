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
const trustIssuer = async (assetName, trustLimit) => {};

module.exports = trustIssuer;
