'use strict';
const MEMBERS_TABLE = 'members';
const {database} = require('./database');

async function memberCreate(data) {
  const sql =
    `INSERT INTO ${MEMBERS_TABLE} (firstName, lastName, birthDate, streetAddress,
                                       city, zip, state, phoneNumber, ssn, creditScore, creationDate)
         VALUES ($firstName, $lastName, $birthDate, $streetAddress,
                 $city, $zip, $state, $phoneNumber, $ssn, $creditScore, $dateTime)`;

  const params = {
    $firstName: data.firstName,
    $lastName: data.lastName,
    $birthDate: data.birthDate,
    $streetAddress: data.streetAddress,
    $city: data.city,
    $state: data.state,
    $zip: data.zip,
    $phoneNumber: data.phoneNumber,
    $ssn: data.ssn,
    $creditScore: data.creditScore,
    $dateTime: Date.now(),
  };

  return new Promise((resolve, reject) => {
    database.run(sql, params, (err, result) => {
      (err) ? reject(err) : resolve(result);
    });
  });
}

async function memberGetById(memberId) {
  const sql = `SELECT *
                 FROM ${MEMBERS_TABLE}
                 WHERE memberId = $memberId`;
  const params = {$memberId: memberId};
  return new Promise((resolve, reject) => {
    database.get(sql, params, (err, result) => {
      if (err || result === undefined) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

async function memberGetByLastName(lastName) {
  const sql = `SELECT *
                 FROM ${MEMBERS_TABLE}
                 WHERE lastName = $lastName`;
  const params = {$lastName: lastName};

  return new Promise((resolve, reject) => {
    database.all(sql, params, (err, rows) => {
      if (err || rows[0] === undefined) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

async function memberGetBySsn(ssn) {
  const sql = `SELECT *
                 FROM ${MEMBERS_TABLE}
                 WHERE ssn = $ssn`;
  const params = {$ssn: ssn};

  return new Promise((resolve, reject) => {
    database.all(sql, params, (err, rows) => {
      if (err || rows[0] === undefined) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

module.exports = {
  memberCreate, memberGetById,
  memberGetByLastName, memberGetBySsn,
};
