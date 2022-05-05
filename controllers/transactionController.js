'use strict';
const DB_SHARE = require('../models/dbShare');
const resController = require('./resController');
const DB_TRANSACTION = require('../models/dbTransaction');
const DATABASE = {...DB_SHARE, ...DB_TRANSACTION};

async function handleTransaction(req, res) {
  let invalidCode;
  for (let i = 0; i < req.body['transactions'].length; i++) {
    const memberId = req.body['transactions'][i]['memberId'];
    const shareId = req.body['transactions'][i]['shareId'];
    const code = req.body['transactions'][i]['code'];
    const amount = req.body['transactions'][i]['amount'];

    if (code === 'CR') {
      await DATABASE.shareDeposit(memberId, shareId, amount)
        .then(() => {
          DATABASE.transactionLog(memberId, shareId, amount, code);
        })
        .catch(() => {
          resController.respondError(res, `failed`,
            `unable to deposit cash`, 401);
        });
    } else if (code === 'KR') {
      await DATABASE.shareDeposit(memberId, shareId, amount)
        .then(() => {
          DATABASE.transactionLog(memberId, shareId, amount, code);
        })
        .catch(() => {
          resController.respondError(res, `failed`,
            `unable to deposit check`, 401);
        });
    } else if (code === 'SW') {
      await DATABASE.shareWithdrawal(memberId, shareId, amount)
        .then(() => {
          DATABASE.transactionLog(memberId, shareId, (amount * -1), code);
        })
        .catch(() => {
          resController.respondError(res, `failed`,
            `withdraw exceeds limit`, 401);
        });
    } else {
      invalidCode = true;
    }
  }
  if (invalidCode) {
    resController.respondError(res, `failed`,
      `Invalid transaction code`, 401);
  } else {
    resController.respondSuccess(res, `transactions success`);
  }
}

module.exports = {handleTransaction};

