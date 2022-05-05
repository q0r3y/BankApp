'use strict';
const router = require('express').Router();
const expressFileUpload = require('express-fileupload');
const {body, validationResult} = require('express-validator');
const fileController = require('../../controllers/fileController');
const userController = require('../../controllers/userController');
const searchController = require('../../controllers/searchController');
const sessionController = require('../../controllers/sessionController');
const {pagePermissions} = require('../../controllers/permissionController');
const transactionController = require('../../controllers/transactionController');

/**
 * All paths in private API requires the user to be validated
 * If they are not validated the web server sends back an error
 *
 * Next the pagePermission middleware verifys that the validated
 * user has the 'teller' userType attribute under their user account
 *
 * The express-validator body parser is used to verify that
 * the data sent to the server is accurate and appropriate for
 * the usage inside the application.
 *
 * If the express validator detects any errors then it responds
 * with a 400 error and the list of errors.
 * If all the data is validated and expected, it will then
 * send the data to the appropriate controller for further handling.
 */

router.post('/upload',
  sessionController.handleUserValidation(),
  pagePermissions('teller'),
  expressFileUpload(),
  body('memberId')
    .exists({
      checkFalsy: true,
      checkNull: true,
    }).withMessage(' must be present')
    .notEmpty().withMessage(' must not be empty')
    .isNumeric().withMessage(' must be a numeric value'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    await fileController.fileUpload(req, res);
  });

router.post('/search',
  sessionController.handleUserValidation(),
  pagePermissions('teller'),
  body('memberSearchValue')
    .exists({
      checkFalsy: true,
      checkNull: true,
    }).withMessage(' must be present')
    .notEmpty().withMessage(' must not be empty'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    await searchController.searchForUser(req, res);
  });

router.post('/getshares',
  sessionController.handleUserValidation(),
  pagePermissions('teller'),
  body('memberId')
    .exists({
      checkFalsy: true,
      checkNull: true,
    }).withMessage(' must be present')
    .notEmpty().withMessage(' must not be empty')
    .isNumeric().withMessage(' must be a numeric value'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    await searchController.retrieveShareData(req, res);
  });

router.post('/statements',
  sessionController.handleUserValidation(),
  pagePermissions('teller'),
  body('memberId')
    .exists({
      checkFalsy: true,
      checkNull: true,
    }).withMessage(' must be present')
    .notEmpty().withMessage(' must not be empty')
    .isNumeric().withMessage(' must be a numeric value'),
  body('shareCode')
    .exists({
      checkFalsy: true,
      checkNull: true,
    }).withMessage(' must be present')
    .notEmpty().withMessage(' must not be empty')
    .isNumeric().withMessage(' must be a numeric value'),
  body('fromDateEpoch')
    .trim().escape()
    .isNumeric().withMessage(' must be an epoch numeric value')
    .exists({
      checkFalsy: true,
      checkNull: true,
    }).withMessage(' must be present')
    .notEmpty().withMessage(' must not be empty'),
  body('toDateEpoch')
    .trim().escape()
    .isNumeric().withMessage(' must be an epoch numeric value')
    .exists({
      checkFalsy: true,
      checkNull: true,
    }).withMessage(' must be present')
    .notEmpty().withMessage(' must not be empty'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    //console.log(req.body);
    await searchController.searchTransactions(req, res);
  });

router.post('/transaction',
  sessionController.handleUserValidation(),
  pagePermissions('teller'),
  body('transactions.*.memberId')
    .exists({
      checkFalsy: true,
      checkNull: true,
    }).withMessage(' must be present')
    .notEmpty().withMessage(' must not be empty')
    .isNumeric().withMessage(' must be a numeric value'),
  body('transactions.*.shareId')
    .exists({
      checkFalsy: true,
      checkNull: true,
    }).withMessage(' must be present')
    .notEmpty().withMessage(' must not be empty')
    .isNumeric().withMessage(' must be a numeric value'),
  body('transactions.*.code')
    .exists({
      checkFalsy: true,
      checkNull: true,
    }).withMessage(' must be present')
    .notEmpty().withMessage(' must not be empty')
    .isString().withMessage(' must be a string value'),
  body('transactions.*.amount')
    .exists({
      checkFalsy: true,
      checkNull: true,
    }).withMessage(' must be present')
    .notEmpty().withMessage(' must not be empty')
    .isNumeric().withMessage(' must be a numeric value')
    .custom((value) => {
      if (value <= 0) {
        throw new Error(' must be greater than 0');
      }
      return true;
    }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    await transactionController.handleTransaction(req, res);
  });


router.post('/create',
  // sessionController.handleUserValidation(),
  // pagePermissions('teller'),
  body('firstName')
    .trim().escape()
    .exists({
      checkFalsy: true,
      checkNull: true,
    }).withMessage(' must be present')
    .notEmpty().withMessage(' must not be empty')
    .isString().withMessage(' must be a string value'),
  body('lastName')
    .trim().escape()
    .exists({
      checkFalsy: true,
      checkNull: true,
    }).withMessage(' must be present')
    .notEmpty().withMessage(' must not be empty')
    .isString().withMessage(' must be a string value'),
  body('birthDate')
    .trim().escape()
    .isDate().withMessage(' must be a valid date')
    .exists({
      checkFalsy: true,
      checkNull: true,
    }).withMessage(' must be present')
    .notEmpty().withMessage(' must not be empty'),
  body('streetAddress')
    .trim().escape()
    .exists({
      checkFalsy: true,
      checkNull: true,
    }).withMessage(' must be present')
    .notEmpty().withMessage(' must not be empty')
    .isString().withMessage(' must be a string value'),
  body('city')
    .trim().escape()
    .exists({
      checkFalsy: true,
      checkNull: true,
    }).withMessage(' must be present')
    .notEmpty().withMessage(' must not be empty')
    .isString().withMessage(' must be a string value'),
  body('zip')
    .trim().escape()
    .exists({
      checkFalsy: true,
      checkNull: true,
    }).withMessage(' must be present')
    .notEmpty().withMessage(' must not be empty')
    .isString().withMessage(' must be a string value'),
  body('state')
    .trim().escape()
    .exists({
      checkFalsy: true,
      checkNull: true,
    }).withMessage(' must be present')
    .notEmpty().withMessage(' must not be empty')
    .isString().withMessage(' must be a string value'),
  body('phoneNumber')
    .trim().escape()
    .exists({
      checkFalsy: true,
      checkNull: true,
    }).withMessage(' must be present')
    .notEmpty().withMessage(' must not be empty')
    .isString().withMessage(' must be a string value'),
  body('ssn')
    .trim().escape()
    .exists({
      checkFalsy: true,
      checkNull: true,
    }).withMessage(' must be present')
    .notEmpty().withMessage(' must not be empty')
    .isString().withMessage(' must be a string value'),
  body('email')
    .trim().escape()
    .optional()
    .isEmail().withMessage(' must contain a valid email address')
    .isString().withMessage(' must be a string value')
    .withMessage(' must contain a valid email address'),
  body('password')
    .if(body('email').exists({
      checkFalsy: true,
      checkNull: true,
    }))
    .exists({
      checkFalsy: true,
      checkNull: true,
    }).withMessage(' must be present')
    .notEmpty().withMessage(' must not be empty')
    .isString().withMessage(' must be a string value')
    .isLength({min: 8, max: 100})
    .withMessage(' must be between 8 and 100 characters'),
  body('beneficiary')
    .optional()
    .exists({
      checkFalsy: true,
      checkNull: true,
    }),
  body('beneficiary.firstName')
    .if(body('beneficiary').exists())
    .trim().escape()
    .exists({
      checkFalsy: true,
      checkNull: true,
    }).withMessage(' must be present')
    .notEmpty().withMessage(' must not be empty')
    .isString().withMessage(' must be a string value'),
  body('beneficiary.lastName')
    .if(body('beneficiary').exists())
    .trim().escape()
    .exists({
      checkFalsy: true,
      checkNull: true,
    }).withMessage(' must be present')
    .notEmpty().withMessage(' must not be empty')
    .isString().withMessage(' must be a string value'),
  body('beneficiary.birthDate')
    .if(body('beneficiary').exists())
    .trim().escape()
    .isDate().withMessage(' must be a valid date')
    .exists({
      checkFalsy: true,
      checkNull: true,
    }).withMessage(' must be present')
    .notEmpty().withMessage(' must not be empty'),
  body('beneficiary.streetAddress')
    .if(body('beneficiary').exists())
    .trim().escape()
    .exists({
      checkFalsy: true,
      checkNull: true,
    }).withMessage(' must be present')
    .notEmpty().withMessage(' must not be empty')
    .isString().withMessage(' must be a string value'),
  body('beneficiary.city')
    .if(body('beneficiary').exists())
    .trim().escape()
    .exists({
      checkFalsy: true,
      checkNull: true,
    }).withMessage(' must be present')
    .notEmpty().withMessage(' must not be empty')
    .isString().withMessage(' must be a string value'),
  body('beneficiary.zip')
    .if(body('beneficiary').exists())
    .trim().escape()
    .exists({
      checkFalsy: true,
      checkNull: true,
    }).withMessage(' must be present')
    .notEmpty().withMessage(' must not be empty')
    .isString().withMessage(' must be a string value'),
  body('beneficiary.state')
    .if(body('beneficiary').exists())
    .trim().escape()
    .exists({
      checkFalsy: true,
      checkNull: true,
    }).withMessage(' must be present')
    .notEmpty().withMessage(' must not be empty')
    .isString().withMessage(' must be a string value'),
  body('beneficiary.phoneNumber')
    .if(body('beneficiary').exists())
    .trim().escape()
    .exists({
      checkFalsy: true,
      checkNull: true,
    }).withMessage(' must be present')
    .notEmpty().withMessage(' must not be empty')
    .isString().withMessage(' must be a string value'),
  body('beneficiary.ssn')
    .if(body('beneficiary').exists())
    .trim().escape()
    .exists({
      checkFalsy: true,
      checkNull: true,
    }).withMessage(' must be present')
    .notEmpty().withMessage(' must not be empty')
    .isString().withMessage(' must be a string value'),
  async (req, res) => {
    //console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    await userController.createNewMember(req, res);
  });

module.exports = router;
