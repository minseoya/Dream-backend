const express = require('express');
const checkLogInToken = require('../utils/auth');
const paymentController = require('../controllers/paymentController');

const router = express.Router();

router.post('/bidding/buying', paymentController.buyBidding);
router.post(
  '/bidding/selling',

  paymentController.createSellBidding
);
router.post('/buying', paymentController.createBuyPayment);
router.post('/selling', paymentController.createSellPayment);

module.exports = {
  router,
};
