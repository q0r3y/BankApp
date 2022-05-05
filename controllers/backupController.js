'use strict';
const cron = require('node-cron');
const {database} = require('../models/database');

/**
 * The node-cron job here runs a backup of the database every 5 minutes
 */

function init() {
  console.log(`[*] backupController initialized.`);
  cron.schedule('5 * * * *', async () => {
    console.log('[*] Cron schedule database backup started...');
    const backup = await database.backup('./data/backups/bank.sqlite3.bak', () => {
      console.log(`[+] Backup job completed.`);
    });
    await backup.step(-1);
    await backup.finish();
  });
}

module.exports = {init};
