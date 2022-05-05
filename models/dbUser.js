'use strict';
const USERS_TABLE = 'users';
const bcrypt = require('bcrypt');
const {database} = require('./database');

async function userCreate(data) {
  const sql = `INSERT INTO ${USERS_TABLE}
                     (email, password, userType)
                 VALUES ($email, $password, $userType)`;
  const params = {
    $email: data.email,
    $password: await bcrypt.hash(data.password, 10),
    $userType: 'user',
  };

  return new Promise((resolve, reject) => {
    database.run(sql, params, (err, result) => {
      (err) ? reject(err) : resolve(result);
    });
  });
}

async function userLogin(inputEmail, inputPassword) {
  const sql = `SELECT *
                 FROM ${USERS_TABLE}
                 WHERE email = $email`;
  const params = {$email: inputEmail};

  return new Promise((resolve, reject) => {
    database.get(sql, params, async (err, result) => {
      if (result) {
        if (await bcrypt.compare(inputPassword, result.password)) {
          resolve(result);
        } else {
          reject();
        }
      } else {
        reject();
      }
    });
  });
}

async function userGetDataByCookie(cookie) {
  const sql = `SELECT *
                 FROM ${USERS_TABLE}
                          INNER JOIN cookies
                                     ON cookies.userId = ${USERS_TABLE}.userId
                 WHERE cookieSessionId = $cookie`;
  const params = {$cookie: cookie};

  return new Promise((resolve, reject) => {
    database.get(sql, params, (err, result) => {
      (err) ? reject(err) : resolve(result);
    });
  });
}

module.exports = {userLogin, userGetDataByCookie, userCreate};
