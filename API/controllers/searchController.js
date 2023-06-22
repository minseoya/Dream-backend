const searchService = require('../services/searchService');
const { catchAsync } = require('../utils/error');

const search = catchAsync(async (req, res) => {
  const { limit = 10, offset = 0, keyword } = req.query;

  if (!keyword) {
    return res.status(400).json({ message: 'KEYWORD_NEEDED' });
  }

  const searchData = await searchService.search(
    parseInt(limit),
    parseInt(offset),
    keyword
  );

  return res.status(200).json(searchData);
});

const getHotTopics = catchAsync(async (req, res) => {
  const hotTopics = await searchService.getHotTopics();

  return res.status(200).json(hotTopics);
});

module.exports = {
  search,
  getHotTopics,
};
