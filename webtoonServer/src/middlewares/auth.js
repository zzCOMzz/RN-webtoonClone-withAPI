const jwt = require('jsonwebtoken');
const {secret} = require('../config');

exports.checkToken = (req, res, next) => {
  let token =
    req.headers['x-access-token'] ||
    req.headers['authorization'] ||
    req.headers['Authorization'];
  if (!token)
    return res.json({message: 'You Have to Login First', success: false});
  if (token.startsWith('Bearir ')) {
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, secret, (err, decode) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token Is Not Valid',
        });
      } else {
        req.decode = decode;
        next();
      }
    });
  } else {
    return res.json({success: false, message: 'Auth Token is not supplied'});
  }
};
