const productService = require('../services/productService');
const { catchAsync } = require('../utils/error');

const getProductDetail = catchAsync(async (req, res) => {
  const { productId } = req.params;

  const productDetail = await productService.getProductDetail(productId);

  return res.status(200).json(productDetail);
});

const getProductList = catchAsync(async (req, res) => {
  const {
    categoryId,
    ageId,
    levelId,
    sort,
    sortorder,
    limit = 10,
    offset = 0,
  } = req.query;

  const products = await productService.getProductList({
    categoryId,
    ageId,
    levelId,
    sort,
    sortorder,
    limit: parseInt(limit),
    offset: parseInt(offset),
  });

  return res.status(200).json(products);
});

const getProductByLike = catchAsync(async (req, res) => {
  if (!req.isAuth) {
    const error = new Error('Not authenticated!');
    error.code = 401;
    throw error;
  }
  const userId = req.user.id;

  const data = await productService.getProductByLike(userId);

  return res.status(200).json(data);
});

module.exports = {
  getProductDetail,
  getProductList,
  getProductByLike,
  getProductDetail,
  getProductList,
};
