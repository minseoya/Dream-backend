const bidStatusEnum = Object.freeze({
  bid: 1,
  deal: 2,
  fail: 3,
});

const dealStatusEnum = Object.freeze({
  bidSuccess: 1,
  paymentAwait: 2,
  paymentDone: 3,
  delivery: 4,
  deliveryDone: 5,
});

const commissionRateEnum = Object.freeze({
  buying: 0.02,
  selling: 0.05,
});

const counterCommissionRateEnum = Object.freeze({
  buying: 0.05,
  selling: 0.02,
});

module.exports = {
  bidStatusEnum,
  dealStatusEnum,
  commissionRateEnum,
  counterCommissionRateEnum,
};
