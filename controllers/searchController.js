'use strict';
const DB_SHARE = require('../models/dbShare');
const DB_MEMBER = require('../models/dbMember');
const resController = require('./resController');
const DB_TRANSACTION = require('../models/dbTransaction');
const DATABASE = {...DB_MEMBER, ...DB_SHARE, ...DB_TRANSACTION};

async function retrieveShareData(req, res) {
  await DATABASE.shareGetData(req.body['memberId'])
    .then(async (result) => {
      resController.respondSuccess(res, 'share data retrieved',
        {'shares': result});
    })
    .catch(() => {
      resController.respondError(res, 'failed',
        'Unable to get share data');
    });
}

async function searchForUser(req, res) {
  const searchValue = req.body['memberSearchValue'].toLowerCase();
  await DATABASE.memberGetById(searchValue)
    .then((result) => {
      resController.respondSuccess(res, 'found by account number',
        {'user': result});
    })
    .catch(async () => {
      await DATABASE.memberGetByLastName(searchValue)
        .then((result) => {
          resController.respondSuccess(res, 'Found by last name',
            {'users': result});
        })
        .catch(() => {
          resController.respondError(res, 'failed',
            'Could not find member(s)');
        });
    });
}

async function searchTransactions(req, res) {
  const memberId = req.body['memberId'];
  const shareCode = req.body['shareCode'];
  const fromDate = req.body['fromDateEpoch'];
  const toDate = req.body['toDateEpoch'];

  await DATABASE.transactionGetByDate(memberId, shareCode, fromDate, toDate)
    .then((result) => {
      resController.respondSuccess(res, `success`, result);
    })
    .catch((err) => {
      resController.respondError(res, `failed`,
        `unable to find transactions`, 401);
    });
}

module.exports = {
  searchForUser, retrieveShareData, searchTransactions,
};
