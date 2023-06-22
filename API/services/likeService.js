const likeDao = require('../models/likeDao');

const isLike = async ({ proudctId, userId }) => {
  let likeId = await likeDao.isLike({ proudctId, userId });

  if (!likeId) {
    await likeDao.createLike({ proudctId, userId });
    return await likeDao.isLike({ proudctId, userId });
  }

  await likeDao.deleteLike({ proudctId, userId });
};

module.exports = { isLike };
