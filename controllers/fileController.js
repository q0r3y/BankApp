'use strict';
const DB_DOCUMENT = require('../models/dbDocument');
const resController = require('./resController');
const DATABASE = {...DB_DOCUMENT};

async function fileUpload(req, res) {
  if (!req.files || Object.keys(req.files).length === 0 || !req.body['memberId']) {
    return resController.respondError(res, 'error', 'No files were uploaded.');
  }
  const fileName = Object.keys(req.files)[0];
  const data = {
    memberId: req.body['memberId'],
    fileName: req.files[fileName].name,
    fileBlob: req.files[fileName].data,
    md5: req.files[fileName].md5,
  };
  await DATABASE.documentStore(data).then(() => {
    resController.respondSuccess(res, 'success', 'file uploaded');
  }).catch(() => {
    resController.respondError(res, 'error', 'file already exists');
  });
}

module.exports = {fileUpload};

