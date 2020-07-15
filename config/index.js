const dotenv = require('dotenv');
dotenv.config();

const issuer = {
  secret: process.env.ISSUER_SK,
  public: process.env.ISSUER_PK
};

const distributor = {
  secret: process.env.DISTRIBUTOR_SK,
  public: process.env.DISTRIBUTOR_PK
};

module.exports = {
  issuer,
  distributor
};
