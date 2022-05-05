'use strict';
const resController = require('./resController');

/**
 * Middleware for handling page permissions
 */

// https://gist.github.com/joshnuss/37ebaf958fe65a18d4ff
function pagePermissions(...permittedRoles) {
  return async (req, res, next) => {
    let userRole = 'public'; // Default role
    if (req.session['userData'] !== undefined) {
      userRole = req.session['userData'].userType.toLowerCase();
    }
    if (userRole && permittedRoles.includes(userRole)) {
      next();
    } else {
      resController.respondError(res, 'error', 'invalid permissions', 401);
      //redirectToLogin(req, res);
      res.end();
    }
  };
}

function redirectToLogin(req, res) {
  res.writeHead(302, {
    'Location': `https://${req.headers['host']}/`,
  });
}

module.exports = {
  pagePermissions,
};
