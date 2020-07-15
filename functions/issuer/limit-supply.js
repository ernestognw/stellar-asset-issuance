const StellarSDK = require('stellar-sdk');
const { server } = require('../../api');
const { issuer } = require('../../config');

/**
 * @description
 * Complete using issuer account to make a transaction with a setOptions
 * operation in which you disable the issuer account, to guarantee
 * there won't be more tokens issued in the future
 */
const limitSupply = async () => {};

module.exports = limitSupply;
