const productDao = require('../models/productDao');
const { BaseError } = require('../utils/error');
const { BidCase } = require('../models/bidDao');

const getProductDetail = async (productId) => {
  const checkProductId = await productDao.isExistingProduct(productId);

  if (!checkProductId) {
    throw new BaseError('PRODUCT_DOES_NOT_EXIST', 404);
  }

  const productDetail = await productDao.productDetail(productId);
  const bidCase = new BidCase(productId);

  productDetail.buyNowPrice = await bidCase.getBuyNowPrice();
  productDetail.sellNowPrice = await bidCase.getSellNowPrice();
  productDetail.recentDealPrice = await bidCase.getRecentDealPrice();
  productDetail.recentDealPrice == null
    ? (productDetail.premiumPercent = null)
    : (productDetail.premiumPercent = (
        ((productDetail.recentDealPrice - productDetail.originalPrice) /
          productDetail.originalPrice) *
        100
      ).toFixed(1));

  return productDetail;
};

const getProductByLike = async (userId) => {
  return await productDao.getProductByLike(userId);
};

const getProductList = async ({
  categoryId,
  ageId,
  levelId,
  sort,
  sortorder,
  limit,
  offset,
}) => {
  return await productDao.getProductList({
    categoryId,
    ageId,
    levelId,
    sort,
    sortorder,
    limit,
    offset,
  });
};

module.exports = {
  getProductList,
  getProductDetail,
  getProductByLike,
};
