'use strict';
/**
 * Need to run: PRAGMA foreign_keys = ON;
 *
 * USERS / MEMBERS:
 * CREATE TABLE members (memberId INTEGER PRIMARY KEY, firstName TEXT NOT NULL, birthDate TEXT NOT NULL, lastName TEXT NOT NULL, streetAddress TEXT NOT NULL, city TEXT NOT NULL, zip TEXT NOT NULL, state TEXT NOT NULL, phoneNumber TEXT NOT NULL, ssn TEXT NOT NULL UNIQUE, creditScore INTEGER, creationDate INTEGER);
 * CREATE TABLE users (userId INTEGER PRIMARY KEY UNIQUE NOT NULL, email TEXT UNIQUE NOT NULL, password TEXT NOT NULL, userType TEXT NOT NULL,  FOREIGN KEY (userId) REFERENCES members (memberId) ON DELETE CASCADE);
 * You can have members who aren't users. You cannot have a user who isn't a member, so the "primary key" for users is the "foreign key" is unique and it's the 'memberId' from members. ("unable to create a user without a unique member id, and also when a member gets deleted the corresponding user is deleted)
 *
 * COOKIES:
 * CREATE TABLE cookies (userId INTEGER NOT NULL, cookieSessionId TEXT NOT NULL, FOREIGN KEY (userId) REFERENCES users (userId) ON DELETE CASCADE);
 * You can have multiple cookies for one unique user, but you cannot have cookies for users that don't exist
 *
 * DOCUMENTS:
 * CREATE TABLE documents (documentId INTEGER PRIMARY KEY, memberId INTEGER NOT NULL, fileName TEXT NOT NULL , fileBlob BLOB NOT NULL, md5 TEXT NOT NULL UNIQUE, FOREIGN KEY (memberId) REFERENCES members (memberId) ON DELETE CASCADE);
 * One member can have many documents, but documents can only have one member. members can have a document without the need for a user account, because a teller could need to scan or store a document for a member who doesn't use online accounts.
 *
 * SHARES:
 * CREATE TABLE shares (memberId INTEGER NOT NULL,  shareCode TEXT NOT NULL, balance REAL NOT NULL CHECK(balance >= 0), PRIMARY KEY (memberId, shareCode), FOREIGN KEY (memberId) REFERENCES members (memberId) ON DELETE CASCADE);
 * One member can have multiple shares, but a share can only have one member. Share codes need to be handled during creation inside of node.js
 *
 * TRANSACTIONS:
 * CREATE TABLE transactions (transactionId INTEGER PRIMARY KEY, memberId INTEGER NOT NULL, shareCode INTEGER NOT NULL, amount REAL NOT NULL, transCode TEXT NOT NULL, dateTime INTEGER, FOREIGN KEY(memberId, shareCode) REFERENCES shares (memberId, shareCode) ON DELETE CASCADE);
 *
 * BENEFICIARIES:
 * CREATE TABLE beneficiaries (beneId INTEGER PRIMARY KEY, memberId INTEGER NOT NULL, firstName TEXT NOT NULL, lastName TEXT NOT NULL, birthDate TEXT NOT NULL, streetAddress TEXT NOT NULL, city TEXT NOT NULL, zip TEXT NOT NULL, state TEXT NOT NULL, phoneNumber TEXT NOT NULL, ssn TEXT NOT NULL UNIQUE, FOREIGN KEY (memberId) REFERENCES members (memberId) ON DELETE CASCADE);
 */

const sqlite3 = require('sqlite3').verbose();
const DATABASE_PATH = './data/bank.sqlite3';

const database = new sqlite3.Database(DATABASE_PATH, (err) => {
  database.get('PRAGMA foreign_keys = ON'); // https://github.com/mapbox/node-sqlite3/issues/896
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    console.log(`[+] database.js/connection: Connected to database.`);
  }
});

module.exports = {database};
