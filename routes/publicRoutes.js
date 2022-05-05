'use strict';
const router = require('express').Router();

/**
 * All routes for non-authenticated public pages
 */

router.get('/', async (req, res) => {
  res.render('./pages/index.ejs');
  res.end();
});

module.exports = router;
