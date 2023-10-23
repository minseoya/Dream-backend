const jwt = require('jsonwebtoken');
const userDao = require('../models/userDao');
const { BaseError } = require('./error');

const checkLogInToken = async (req, res, next) => {
  const accessToken = req.headers.authorization;

  //  수정한 부분
  if (!accessToken) {
    req.isAuth = false;
    return next();
  }

  try {
    const secretKey = process.env.SECRET_KEY;

    //수정 전 코드
    // if (!accessToken) {
    //   const error = new BaseError('NEED_ACCESS_TOKEN', 401);
    //   return res.status(error.statusCode).json({ message: error.message });
    // }

    const decoded = jwt.verify(accessToken, secretKey);

    const user = await userDao.getUserById(decoded.id);

    if (!user) {
      const error = new BaseError('INVALID_USER', 401);
      return res.status(error.statusCode).json({ message: error.message });
    }

    req.user = user;
    req.isAuth = true;
    next();
  } catch (err) {
    return res.status(401).json({
      message: 'INVALID_TOKEN',
    });
  }
};

module.exports = checkLogInToken;
