'use strict';
const router = require('express').Router();
const sessionController = require('../controllers/sessionController');
const {pagePermissions} = require('../controllers/permissionController');

/**
 * All URL paths for /user/*
 * EJS is used to render data on some pages
 */

router.get('/login',
  sessionController.handleUserValidation(),
  async (req, res) => {
    res.clearCookie('connect.sid');
    res.render(`./pages/user/userLogin.ejs`);
    res.end();
  });

router.get('/logout',
  sessionController.logout(),
  async (req, res) => {
    res.clearCookie('connect.sid');
    res.redirect('/user/login');
    res.end();
  });

router.get('/home',
  sessionController.handleUserValidation(),
  pagePermissions('user', 'teller'),
  sessionController.retrieveMemberData(),
  sessionController.retrieveShareData(),
  async (req, res) => {
    const memberData = req.session['memberData'];
    const shareData = req.session['shareData'];
    res.render('./pages/user/userHome.ejs', {
      firstName: memberData.firstName,
      lastName: memberData.lastName,
      shares: shareData,
      pageName: 'Home',
    });
    res.end();
  });


router.get('/deposit',
  sessionController.handleUserValidation(),
  pagePermissions('user', 'teller'),
  sessionController.retrieveMemberData(),
  async (req, res) => {
    const memberData = req.session['memberData'];
    res.render('./pages/user/userDeposit.ejs', {
      firstName: memberData.firstName,
      lastName: memberData.lastName,
      pageName: 'Deposit',
    });
    res.end();
  });

router.get('/transfer',
  sessionController.handleUserValidation(),
  pagePermissions('user', 'teller'),
  sessionController.retrieveMemberData(),
  async (req, res) => {
    const memberData = req.session['memberData'];
    res.render('./pages/user/userTransfer.ejs', {
      firstName: memberData.firstName,
      lastName: memberData.lastName,
      pageName: 'Transfer',
    });
    res.end();
  });

module.exports = router;
