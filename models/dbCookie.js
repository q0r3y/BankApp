'use strict';
const COOKIE_TABLE = 'cookies';
const {database} = require('./database');

async function cookieUserSet(userId, cookie) {
  const sql = `INSERT INTO ${COOKIE_TABLE} (userId, cookieSessionId)
                 VALUES ($userId, $cookie)`;
  const params = {$userId: userId, $cookie: cookie};
  await database.run(sql, params);
}

async function cookieDelete(cookie) {
  const sql = `DELETE
                 FROM ${COOKIE_TABLE}
                 WHERE cookieSessionId = $cookie`;
  const params = {$cookie: cookie};

  return new Promise((resolve, reject) => {
    database.get(sql, params, (err, result) => {
      (err) ? reject(err) : resolve(result);
    });
  });
}

module.exports = {cookieUserSet, cookieDelete};
