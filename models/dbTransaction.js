'use strict';
const TRANSACTIONS_TABLE = 'transactions';
const {database} = require('./database');
const accounting = require('accounting');

async function transactionLog(memberId, shareCode, amount, transCode) {
  const sql = `INSERT INTO ${TRANSACTIONS_TABLE}
                     (memberId, shareCode, amount, transCode, dateTime)
                 VALUES ($memberId, $shareCode, $amount, $transCode, $dateTime)`;
  const params = {
    $memberId: memberId,
    $shareCode: shareCode,
    $amount: accounting.formatNumber(amount, 2, ''),
    $transCode: transCode,
    $dateTime: Date.now(),
  };

  return new Promise((resolve, reject) => {
    database.run(sql, params, (err, result) => {
      (err) ? reject(err) : resolve(result);
    });
  });
}

async function transactionGetByDate(memberId, shareCode, fromDate, toDate) {
  const END_OF_TO_DAY = toDate + (86400000); // Length of day in MS
  const sql = `SELECT *
                 FROM ${TRANSACTIONS_TABLE}
                 WHERE memberId = $memberId
                   AND shareCode = $shareCode
                   AND dateTime >= $beginDate
                   AND dateTime <= ${END_OF_TO_DAY}`;
  const params = {
    $memberId: memberId,
    $shareCode: shareCode,
    $beginDate: fromDate,
  };

  return new Promise((resolve, reject) => {
    database.all(sql, params, (err, result) => {
      if (err || result.length === 0) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

module.exports = {transactionLog, transactionGetByDate};
