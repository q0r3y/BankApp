'use strict';
const DB_USER = require('../models/dbUser');
const DB_SHARE = require('../models/dbShare');
const DB_MEMBER = require('../models/dbMember');
const DB_TRANSACTION = require('../models/dbTransaction');
const DB_BENEFICIARY = require('../models/dbBeneficiary');
const resController = require('./resController');
const DATABASE = {
  ...DB_USER, ...DB_SHARE, ...DB_MEMBER,
  ...DB_TRANSACTION, ...DB_BENEFICIARY,
};

async function createNewMember(req, res) {
  const memberData = {
    firstName: req.body.firstName.toLowerCase(),
    lastName: req.body.lastName.toLowerCase(),
    birthDate: req.body.birthDate,
    streetAddress: req.body.streetAddress.toLowerCase(),
    city: req.body.city.toLowerCase(),
    state: req.body.state.toLowerCase(),
    zip: req.body.zip,
    phoneNumber: req.body.phoneNumber,
    ssn: req.body.ssn,
    creditScore: await simulateCreditScan(),
  };

  await DATABASE.memberCreate(memberData)
    .then(async () => {
      await createNewShare(req, res)
        .then(async () => {
          if (req.body['beneficiary']) {
            await addBeneficiary(req).catch((e) => {
              //console.log(e);
            });
          }
          if (req.body.email && req.body.password) {
            await createNewUser(req, res)
              .then(() => {
                resController.respondSuccess(res, `success`, `new user created`);
              })
              .catch((err) => {
                resController.respondError(res, `error`, `user already exists`);
              });
          } else {
            resController.respondSuccess(res, `success`, `new member created`);
          }
        })
        .catch(() => {
          resController.respondError(res, `error`, `unable to create share`);
        });
    })
    .catch(() => {
      resController.respondError(res, `error`, `member already exists`);
    });
}

/**
 *  In order to create a new share in the same req,
 *  the member data has to be looked up by ssn
 *  because createNewUser query does not return any data,
 *  and the member ID is generated in createNewUser query
 *
 *  Also, when creating a new share it deposits $100 for
 *  demo purposes
 */

async function createNewShare(req) {
  const memberData = await DATABASE.memberGetBySsn(req.body.ssn);
  req.body['memberId'] = memberData[0]['memberId'];
  await DATABASE.shareCreate(req.body['memberId'], 1, 100);
  await DATABASE.transactionLog(req.body['memberId'], 1, 100, 'SD');
}

async function createNewUser(req) {
  const userData = {
    email: req.body.email.toLowerCase(),
    password: req.body.password,
  };
  await DATABASE.userCreate(userData);
}

async function addBeneficiary(req) {
  const beneficiaryData = {
    memberId: req.body.memberId,
    firstName: req.body['beneficiary'].firstName,
    lastName: req.body['beneficiary'].lastName,
    birthDate: req.body['beneficiary'].birthDate,
    streetAddress: req.body['beneficiary'].streetAddress,
    city: req.body['beneficiary'].city,
    zip: req.body['beneficiary'].zip,
    state: req.body['beneficiary'].state,
    phoneNumber: req.body['beneficiary'].phoneNumber,
    ssn: req.body['beneficiary'].ssn,
  };
  //console.log();
  await DATABASE.beneficiaryAdd(beneficiaryData);
}

async function simulateCreditScan() {
  const LOWEST_SCORE = 300;
  const HIGHEST_SCORE = 850;
  await new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });
  return Math.floor(Math.random() *
    (HIGHEST_SCORE - LOWEST_SCORE)) + LOWEST_SCORE;
}

module.exports = {
  createNewMember,
};
