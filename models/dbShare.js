'use strict';
const SHARE_TABLE = 'shares';
const accounting = require('accounting');
const {database} = require('./database');

async function shareGetData(userId) {
  const sql = `SELECT *
                 FROM ${SHARE_TABLE}
                 WHERE memberId = $userId`;
  const params = {$userId: userId};

  return new Promise((resolve, reject) => {
    database.all(sql, params, (err, result) => {
      if (err) {
        reject(err);
      } else {
        //console.log(result);
        result.forEach((elem) => {
          elem.balance = accounting.formatMoney(elem.balance, '', 2);
        });
        resolve(result);
      }
    });
  });
}

async function shareCreate(memberId, shareCode, amount) {
  const sql = `INSERT INTO ${SHARE_TABLE} (memberId, shareCode, balance)
                 VALUES ($memberId, $shareCode, $amount)`;
  const params = {
    $memberId: memberId,
    $shareCode: shareCode,
    $amount: accounting.formatNumber(amount, 2, ''),
  };

  return new Promise((resolve, reject) => {
    database.all(sql, params, (err, result) => {
      (err) ? reject(err) : resolve(result);
    });
  });
}

async function shareWithdrawal(memberId, shareCode, amount) {
  const sql = `UPDATE ${SHARE_TABLE}
                 SET balance=balance - $amount
                 WHERE (memberId = $memberId AND shareCode = $shareCode)`;
  const params = {
    $memberId: memberId,
    $shareCode: shareCode,
    $amount: accounting.formatNumber(amount, 2, ''),
  };

  return new Promise((resolve, reject) => {
    database.run(sql, params, (err, result) => {
      (err) ? reject(err) : resolve(result);
    });
  });
}

async function shareDeposit(memberId, shareCode, amount) {
  const sql = `UPDATE ${SHARE_TABLE}
                 SET balance=balance + $amount
                 WHERE (memberId = $memberId AND shareCode = $shareCode)`;
  const params = {
    $memberId: memberId,
    $shareCode: shareCode,
    $amount: accounting.formatNumber(amount, 2, ''),
  };

  return new Promise((resolve, reject) => {
    database.run(sql, params, (err, result) => {
      (err) ? reject(err) : resolve(result);
    });
  });
}


module.exports = {shareCreate, shareWithdrawal, shareGetData, shareDeposit};
