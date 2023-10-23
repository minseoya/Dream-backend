const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/kakaologin', userController.signInKakao);
router.get('/userInfo', userController.getUserById);
router.post('/address', userController.inputAddress);
router.get('/address', userController.getAddressByUserId);
router.post('/account', userController.inputNewAccount);
router.get('/account', userController.getAccountListByUser);
router.post('/card', userController.inputNewCard);
router.get('/card', userController.getCardListByUser);

module.exports = { router };
