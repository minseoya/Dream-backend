const express = require('express');

const likeController = require('../controllers/likeController');

const router = express.Router();

router.get('/:proudctId', likeController.isLike);

module.exports = {
  router,
};
