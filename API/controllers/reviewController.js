const reviewService = require('../services/reviewService');
const { catchAsync, BaseError } = require('../utils/error');

const createReview = catchAsync(async (req, res) => {
  if (!req.isAuth) {
    const error = new Error('Not authenticated!');
    error.code = 401;
    throw error;
  }

  const userId = req.user.id;

  const { content, title, productId } = req.body;

  const url = req.file.location;

  if (!productId) throw new BaseError('NOT_USERID_OR_PRODUCTID', 400);

  await reviewService.createReview({ userId, productId, content, title, url });

  return res.status(201).json({ message: 'SUCCESS_CREATE' });
});

const getReviewByProductId = catchAsync(async (req, res) => {
  const { productId } = req.query;

  const getReview = await reviewService.getReviewByProductId(productId);

  return res.status(200).json(getReview);
});

const updateReview = catchAsync(async (req, res) => {
  if (!req.isAuth) {
    const error = new Error('Not authenticated!');
    error.code = 401;
    throw error;
  }
  const { reviewId, title, content } = req.body;
  const url = req.file ? req.file.location : '';
  const userId = req.user.id;

  await reviewService.updateReview({ userId, reviewId, title, content, url });

  return res.status(200).json({ message: 'SUCCESS UPDATE' });
});

const deleteReview = catchAsync(async (req, res) => {
  if (!req.isAuth) {
    const error = new Error('Not authenticated!');
    error.code = 401;
    throw error;
  }
  const { reviewId } = req.params;
  const userId = req.user.id;

  if (!reviewId) throw new BaseError('KEY_ERROR', 400);

  await reviewService.deleteReview(reviewId, userId);

  return res.status(200).json({ message: 'SUCCESS_DELETE' });
});

module.exports = {
  createReview,
  getReviewByProductId,
  updateReview,
  deleteReview,
};
