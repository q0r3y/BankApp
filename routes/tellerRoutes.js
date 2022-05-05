'use strict';
const router = require('express').Router();
const sessionController = require('../controllers/sessionController');
const {pagePermissions} = require('../controllers/permissionController');

/**
 * All URL paths for /teller/*
 * EJS is used to render data on some pages
 */

router.get('/login',
  async (req, res) => {
    res.clearCookie('connect.sid');
    res.render(`./pages/teller/tellerLogin.ejs`);
    res.end();
  });

router.get('/logout',
  sessionController.logout(),
  async (req, res) => {
    res.clearCookie('connect.sid');
    res.redirect('/teller/login');
    res.end();
  });

router.get('/home',
  sessionController.handleUserValidation(),
  pagePermissions('teller'),
  sessionController.retrieveMemberData(),
  async (req, res) => {
    const memberData = req.session['memberData'];
    res.render('./pages/teller/tellerHome.ejs', {
      firstName: memberData.firstName,
      lastName: memberData.lastName,
      pageName: 'Home',
    });
    res.end();
  });

router.get('/newmember',
  sessionController.handleUserValidation(),
  pagePermissions('teller'),
  sessionController.retrieveMemberData(),
  async (req, res) => {
    const memberData = req.session['memberData'];
    res.render('./pages/teller/tellerNewMember.ejs', {
      firstName: memberData.firstName,
      lastName: memberData.lastName,
      pageName: 'New Member',
    });
    res.end();
  });

router.get('/withdrawal',
  sessionController.handleUserValidation(),
  pagePermissions('teller'),
  sessionController.retrieveMemberData(),
  async (req, res) => {
    const memberData = req.session['memberData'];
    res.render(`./pages/teller/tellerWithdrawal.ejs`, {
      firstName: memberData.firstName,
      lastName: memberData.lastName,
      pageName: 'Withdrawal',
    });
    res.end();
  });

router.get('/deposit',
  sessionController.handleUserValidation(),
  pagePermissions('teller'),
  sessionController.retrieveMemberData(),
  async (req, res) => {
    const memberData = req.session['memberData'];
    res.render(`./pages/teller/tellerDeposit.ejs`, {
      firstName: memberData.firstName,
      lastName: memberData.lastName,
      pageName: 'Deposit',
    });
    res.end();
  });

router.get('/custom',
  sessionController.handleUserValidation(),
  pagePermissions('teller'),
  sessionController.retrieveMemberData(),
  async (req, res) => {
    const memberData = req.session['memberData'];
    res.render(`./pages/teller/tellerCustom.ejs`, {
      firstName: memberData.firstName,
      lastName: memberData.lastName,
      pageName: 'Custom',
    });
    res.end();
  });

router.get('/statements',
  sessionController.handleUserValidation(),
  pagePermissions('teller'),
  sessionController.retrieveMemberData(),
  async (req, res) => {
    const memberData = req.session['memberData'];
    res.render(`./pages/teller/tellerStatements.ejs`, {
      firstName: memberData.firstName,
      lastName: memberData.lastName,
      pageName: 'Statements',
    });
    res.end();
  });

router.get('/upload',
  sessionController.handleUserValidation(),
  pagePermissions('teller'),
  sessionController.retrieveMemberData(),
  async (req, res) => {
    const memberData = req.session['memberData'];
    res.render(`./pages/teller/tellerUpload.ejs`, {
      firstName: memberData.firstName,
      lastName: memberData.lastName,
      pageName: 'Upload',
    });
    res.end();
  });

module.exports = router;
