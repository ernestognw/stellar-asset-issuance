const inquirer = require('inquirer');
const generateTokens = require('./functions/issuer/generate-tokens.js');
const limitSupply = require('./functions/issuer/limit-supply.js');
const trustIssuer = require('./functions/distributor/trust-issuer.js');
const publishICOOffer = require('./functions/distributor/publish-ICO-offer.js');

const start = async () => {
  try {
    const whoAreYou = [
      {
        type: 'list',
        name: 'whois',
        message: '¿Quién eres?',
        choices: ['Issuer', 'Distributor']
      }
    ];

    const { whois } = await inquirer.prompt(whoAreYou);

    if (whois === 'Issuer') {
      const { action } = await inquirer.prompt([
        {
          type: 'list',
          name: 'action',
          message: '¿Qué quieres hacer?',
          choices: [
            {
              name: 'Generar tokens',
              value: 'generateTokens'
            },
            {
              name: 'Limitar el supply',
              value: 'limitSupply'
            }
          ]
        }
      ]);

      switch (action) {
        case 'generateTokens': {
          const { assetName, amount } = await inquirer.prompt([
            {
              type: 'input',
              name: 'assetName',
              message: 'Ingresa el código del asset que generarás',
              validate: value =>
                value.length === 4 || 'Ingresa un código de 4 dígitos'
            },
            {
              type: 'input',
              name: 'amount',
              message: '¿Cuántos tokens vas a emitir?',
              validate: value => !isNaN(parseInt(value)) || 'Ingresa un número',
              filter: Number
            }
          ]);
          generateTokens(assetName, amount);
          break;
        }
        case 'limitSupply':
          limitSupply();
          break;
      }
    } else {
      const { action } = await inquirer.prompt([
        {
          type: 'list',
          name: 'action',
          message: '¿Que quieres hacer?',
          choices: [
            {
              name: 'Confiar en el issuer',
              value: 'trustIssuer'
            },
            {
              name: 'Publicar la oferta inicial de venta',
              value: 'publishICOOffer'
            }
          ]
        }
      ]);

      switch (action) {
        case 'trustIssuer': {
          const { assetName, trustLimit } = await inquirer.prompt([
            {
              type: 'input',
              name: 'assetName',
              message: 'Ingresa el código del asset en que confiarás',
              validate: value =>
                value.length === 4 || 'Ingresa un código de 4 dígitos'
            },
            {
              type: 'input',
              name: 'trustLimit',
              message: '¿Hasta cuántos tokens confiarás del emisor?',
              validate: value => !isNaN(parseInt(value)) || 'Ingresa un número',
              filter: Number
            }
          ]);
          trustIssuer(assetName, trustLimit);
          break;
        }
        case 'publishICOOffer':
          {
            const { assetName, amount, price } = await inquirer.prompt([
              {
                type: 'input',
                name: 'assetName',
                message: 'Ingresa el código del asset que vas a ofertar',
                validate: value =>
                  value.length === 4 || 'Ingresa un código de 4 dígitos'
              },
              {
                type: 'input',
                name: 'amount',
                message: '¿Cuántos tokens vas a poner en oferta?',
                validate: value =>
                  !isNaN(parseInt(value)) || 'Ingresa un número',
                filter: Number
              },
              {
                type: 'input',
                name: 'price',
                message: '¿Cuántos XLM pedirás a cambio de cada token?',
                validate: value =>
                  !isNaN(parseInt(value)) || 'Ingresa un número',
                filter: Number
              }
            ]);
            publishICOOffer(assetName, amount, price);
          }
          break;
      }
    }
  } catch (err) {
    console.log(err);
  }
};

start();
