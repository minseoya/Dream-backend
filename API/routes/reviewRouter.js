const express = require('express');

const reviewController = require('../controllers/reviewController');
const { upload } = require('../utils/s3');

const router = express.Router();

router.get('', reviewController.getReviewByProductId);
router.post('', upload.single('reviewImg'), reviewController.createReview);
router.patch('', upload.single('reviewImg'), reviewController.updateReview);
router.delete('/:reviewId', reviewController.deleteReview);

module.exports = {
  router,
};
