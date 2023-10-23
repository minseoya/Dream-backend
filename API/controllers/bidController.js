const bidService = require('../services/bidService');
const { catchAsync, BaseError } = require('../utils/error');

const graphByTerm = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const { term } = req.query;

  const data = await bidService.graphByTerm(productId, term);

  return res.status(200).json(data);
});

const infoByproductId = catchAsync(async (req, res) => {
  const { productId } = req.params;

  const data = await bidService.infoByproductId(productId);

  return res.status(200).json(data);
});

const inputBidPrice = catchAsync(async (req, res) => {
  if (!req.isAuth) {
    const error = new Error('Not authenticated!');
    error.code = 401;
    throw error;
  }

  const { productId, bidType, bidPrice, dueDate } = req.body;

  if (
    !productId ||
    !bidType ||
    !bidPrice ||
    !dueDate ||
    !(bidType == 'buying' || bidType == 'selling')
  ) {
    throw new BaseError('KEY_ERROR', 400);
  }

  const userId = req.user.id;

  await bidService.inputBidPrice({
    productId,
    bidType,
    bidPrice,
    dueDate,
    userId,
  });

  return res.status(201).json({ message: 'BIDDING_IN_SUCCESS' });
});

const getBiddingInfo = catchAsync(async (req, res) => {
  if (!req.isAuth) {
    const error = new Error('Not authenticated!');
    error.code = 401;
    throw error;
  }

  const { productId } = req.params;
  const { bidtype: bidType } = req.query;

  const userId = req.user.id;

  if (!productId || !bidType) throw new BaseError('KEY_ERROR', 400);

  const biddingInfo = await bidService.getBiddingInfo({
    productId,
    bidType,
    userId,
  });

  return res.status(200).json(biddingInfo);
});

module.exports = {
  graphByTerm,
  infoByproductId,
  inputBidPrice,
  getBiddingInfo,
};
