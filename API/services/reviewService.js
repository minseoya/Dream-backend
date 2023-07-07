const reviewDao = require('../models/reviewDao');
const { BaseError } = require('../utils/error');

const createReview = async ({ userId, productId, content, title, url }) => {
  const createReview = await reviewDao.createReview({
    userId,
    productId,
    content,
    title,
    url,
  });

  return createReview;
};

const getReviewByProductId = async (productId) => {
  return await reviewDao.getReviewByProductId(productId);
};

const deleteReview = async (reviewId, userId) => {
  const userReview = await reviewDao.checkUserReview(reviewId);
  if (userReview[0].userId != userId) {
    throw new BaseError(401, 'Unauthorized');
  }
  return await reviewDao.deleteReview(reviewId);
};

const updateReview = async ({ userId, reviewId, title, content, url }) => {
  const checkReviewId = await reviewDao.verificationReviewId(reviewId);

  if (!checkReviewId) {
    throw new BaseError(400, 'Not Found review');
  }

  return await reviewDao.updateReview({
    userId,
    reviewId,
    title,
    content,
    url,
  });
};

module.exports = {
  createReview,
  getReviewByProductId,
  deleteReview,
  updateReview,
};
