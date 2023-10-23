const paymentService = require('../services/paymentService');
const { catchAsync, BaseError } = require('../utils/error');

const createBuyPayment = catchAsync(async (req, res) => {
  if (!req.isAuth) {
    const error = new Error('Not authenticated!');
    error.code = 401;
    throw error;
  }
  const userId = req.user.id;
  const { addressId, dealNumber, biddingId } = req.body;

  if (!addressId || !dealNumber || !biddingId) {
    throw new BaseError('KEY_ERROR', 400);
  }

  const createPayment = await paymentService.createBuyPayment({
    addressId,
    userId,
    biddingId,
    dealNumber,
  });

  return res.status(201).json(createPayment);
});

const buyBidding = catchAsync(async (req, res) => {
  if (!req.isAuth) {
    const error = new Error('Not authenticated!');
    error.code = 401;
    throw error;
  }
  const userId = req.user.id;
  const { addressId, biddingId } = req.body;

  if (!addressId || !biddingId) {
    throw new BaseError('KEY_ERROR', 400);
  }

  const buyBidding = await paymentService.buyBidding({
    addressId,
    userId,
    biddingId,
  });

  return res.status(200).json(buyBidding);
});

const createSellPayment = catchAsync(async (req, res) => {
  if (!req.isAuth) {
    const error = new Error('Not authenticated!');
    error.code = 401;
    throw error;
  }
  const userId = req.user.id;
  const { dealNumber, cardNumberId, accountNumberId, biddingId } = req.body;

  if (!dealNumber || !cardNumberId || !accountNumberId || !biddingId) {
    throw new BaseError('KEY_ERROR', 400);
  }

  const createSellPayment = await paymentService.createSellPayment({
    dealNumber,
    cardNumberId,
    accountNumberId,
    userId,
    biddingId,
  });

  return res.status(201).json(createSellPayment);
});

const createSellBidding = catchAsync(async (req, res) => {
  if (!req.isAuth) {
    const error = new Error('Not authenticated!');
    error.code = 401;
    throw error;
  }
  const userId = req.user.id;
  const { cardNumberId, accountNumberId, biddingId } = req.body;

  if (!cardNumberId || !accountNumberId || !biddingId) {
    throw new BaseError('KEY_ERROR', 400);
  }

  const createSellBidding = await paymentService.createSellBidding({
    cardNumberId,
    accountNumberId,
    userId,
    biddingId,
  });

  return res.status(200).json(createSellBidding);
});

module.exports = {
  createSellPayment,
  createBuyPayment,
  buyBidding,
  createSellBidding,
};
