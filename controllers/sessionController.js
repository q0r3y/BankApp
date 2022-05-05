'use strict';
const DB_USER = require('../models/dbUser');
const DB_SHARE = require('../models/dbShare');
const DB_COOKIE = require('../models/dbCookie');
const DB_MEMBER = require('../models/dbMember');
const resController = require('./resController');
const DATABASE = {
  ...DB_USER, ...DB_SHARE, ...DB_COOKIE,
  ...DB_MEMBER,
};

async function login(req, res) {
  const email = req.body.email.toLowerCase();
  const password = req.body.password;
  const cookie = req.cookies[`connect.sid`];
  await DATABASE.userLogin(email, password)
    .then(async (result) => {
      await DATABASE.cookieUserSet(result['userId'], cookie);
      resController.respondSuccess(res, `success`,
        {userType: result.userType});
    })
    .catch(() => {
      resController.respondError(res, `failed`,
        `invalid login`, 401);
    });
}

function logout() {
  return async (req, res, next) => {
    const cookie = req.cookies[`connect.sid`];
    await DATABASE.cookieDelete(cookie).then(() => {
      next();
    });
  };
}

function handleUserValidation() {
  return async (req, res, next) => {
    const cookie = req.cookies['connect.sid'];
    await DATABASE.userGetDataByCookie(cookie)
      .then(async (result) => {
        req.session.userData = result;
        next();
      })
      .catch(() => {
        resController.returnToHome(res, req);
      });
  };
}

function retrieveMemberData() {
  return async (req, res, next) => {
    const memberId = req.session['userData']['userId'];
    await DATABASE.memberGetById(memberId)
      .then(async (result) => {
        req.session.memberData = result;
        next();
      })
      .catch(() => {
        resController.returnToHome(res, req);
      });
  };
}

function retrieveShareData() {
  return async (req, res, next) => {
    const memberId = req.session['userData']['userId'];
    await DATABASE.shareGetData(memberId)
      .then(async (result) => {
        req.session.shareData = result;
        next();
      })
      .catch(() => {
        resController.returnToHome(res, req);
      });
  };
}

module.exports = {
  handleUserValidation, retrieveMemberData, retrieveShareData, login, logout,
};
