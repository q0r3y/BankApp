'use strict';

/**
 * Simple functions that allow for returning
 * standard responses
 */

function respondSuccess(res, status, msg) {
  if (msg) {
    res.status(200).json({
      status: status,
      msg: msg,
    });
  } else {
    res.status(200).json({
      status: status,
    });
  }
}

function respondError(res, status, msg, responseCode) {
  if (responseCode) {
    res.status(responseCode).json({
      'errors': [
        {
          status: status,
          msg: msg || 'something went wrong',
        }],
    });
  } else {
    res.status(400).json({
      'errors': [
        {
          status: status,
          msg: msg || 'something went wrong',
        }],
    });
  }
}

function returnToHome(res, req) {
  res.writeHead(302, {
    'Location': `https://${req.headers['host']}/`,
  });
  res.end();
}

module.exports = {respondError, respondSuccess, returnToHome};
