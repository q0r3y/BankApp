'use strict';
const router = require('express').Router();
const {body, validationResult} = require('express-validator');
const resController = require('../../controllers/resController');
const sessionController = require('../../controllers/sessionController');

/**
 * The public api routes are similar in functionality to the
 * private API routes, but there are no page permission checks.
 */

router.post('/login',
  body('email')
    .trim().escape()
    .exists().withMessage('must be present')
    .isEmail().withMessage('must contain a valid email address')
    .isString().withMessage('must be a string value'),
  body('password')
    .trim().escape()
    .exists().withMessage('must be present')
    .isString().withMessage('must be a string value')
    .isLength({min: 1, max: 100}).withMessage(
    'must be gt 1 and lt 100 characters'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return resController.respondError(res, 'invalid entry', errors.array());
    }
    await sessionController.login(req, res);
  });


module.exports = router;
