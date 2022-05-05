'use strict';
const DOCUMENT_TABLE = 'documents';
const {database} = require('./database');

async function documentStore(data) {
  const sql = `INSERT INTO ${DOCUMENT_TABLE} (memberId, fileName, fileBlob, md5)
                 VALUES ($memberId, $fileName, $fileBlob, $md5)`;
  const params = {
    $memberId: data.memberId,
    $fileName: data.fileName,
    $fileBlob: data.fileBlob,
    $md5: data.md5,
  };

  return new Promise((resolve, reject) => {
    database.run(sql, params, (err, result) => {
      (err) ? reject(err) : resolve(result);
    });
  });
}

/**
 * User page had remote check deposit functionality,
 * but it hasn't been restored.
 */
async function depositRemoteCheck() {
  console.log(`Deposited remote check`);
}

module.exports = {documentStore};
