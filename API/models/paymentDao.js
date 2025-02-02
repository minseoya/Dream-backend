const appDataSource = require('./appDataSource');
const { DatabaseError } = require('../utils/error');
const { dealStatusEnum } = require('./enum');

const buyBidding = async (userId, biddingId) => {
  try {
    return await appDataSource.query(
      `SELECT
      pi.url AS productImage,
      b.bid_price AS bidPrice,
      DATE_FORMAT(b.due_date, '%Y-%m-%d') AS dueDate
      FROM buyings b
      JOIN product_images pi ON pi.product_id = b.product_id 
      WHERE b.user_id = ?
      AND b.id = ?`,
      [userId, biddingId]
    );
  } catch (err) {
    throw new DatabaseError('DATABASE_ERROR');
  }
};

const buyingAddress = async ({ addressId, userId, biddingId }) => {
  try {
    return await appDataSource.query(
      `
    UPDATE buyings
    SET address_id = ?
    WHERE user_id = ?
    AND buyings.id =?
    `,
      [addressId, userId, biddingId]
    );
  } catch (err) {
    throw new DatabaseError('DATABASE_ERROR');
  }
};

const getSellBidding = async (userId, biddingId) => {
  try {
    return await appDataSource.query(
      `
      SELECT
      pi.url AS productImage,
      s.bid_price AS bidPrice,
      DATE_FORMAT(s.due_date, '%Y-%m-%d') dueDate
      FROM sellings s
      JOIN product_images pi ON pi.product_id = s.product_id
      WHERE user_id = ?
      AND s.id = ?
      `,
      [userId, biddingId]
    );
  } catch (err) {
    throw new DatabaseError('DATABASE_ERROR');
  }
};

const updateSellbiddingInfo = async ({
  cardNumberId,
  accountNumberId,
  userId,
  biddingId,
}) => {
  const queryRunner = appDataSource.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    await queryRunner.query(
      `
      UPDATE sellings
      SET card_number_id = ?,
      account_number_id = ?
      WHERE user_id = ?
      AND id = ?
      `,
      [cardNumberId, accountNumberId, userId, biddingId]
    );

    await queryRunner.commitTransaction();
  } catch (err) {
    await queryRunner.rollbackTransaction();
    throw new DatabaseError('DATABASE_ERROR');
  } finally {
    await queryRunner.release();
  }
};

const createSellPayment = async ({
  dealNumber,
  cardNumberId,
  accountNumberId,
  userId,
  biddingId,
}) => {
  const queryRunner = appDataSource.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const paymentAwait = dealStatusEnum.paymentAwait;

    await queryRunner.query(
      `
      UPDATE sellings
      SET card_number_Id = ?,account_number_Id = ?
      WHERE id = ? AND user_id = ?
      `,
      [cardNumberId, accountNumberId, biddingId, userId]
    );

    await queryRunner.query(
      `
      UPDATE deals
      SET deal_status_id = ?
      WHERE deal_number = ?
      `,
      [paymentAwait, dealNumber]
    );

    await queryRunner.commitTransaction();

    return;
  } catch (err) {
    await queryRunner.rollbackTransaction();
    throw new DatabaseError('DATABASE_ERROR');
  } finally {
    await queryRunner.release();
  }
};

const getSellPayment = async (dealNumber) => {
  try {
    return await queryRunner.query(
      `
      SELECT
        pi.url AS productImage,
        d.selling_commission AS commission,
        s.bid_price AS bidPrice
      FROM product_images pi
      JOIN sellings s
      ON pi.product_id = s.product_id
      JOIN deals d
      ON d.selling_id = s.id
      WHERE d.deal_number = ?
    `,
      [dealNumber]
    );
  } catch (err) {
    throw new DatabaseError('DATABASE_ERROR');
  }
};
const createBuyPayment = async (dealNumber) => {
  const queryRunner = appDataSource.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const paymentDone = dealStatusEnum.paymentDone;

    await queryRunner.query(
      `
    UPDATE deals
    SET deal_status_id =?
    WHERE deal_number = ? `,
      [paymentDone, dealNumber]
    );

    await queryRunner.commitTransaction();

    return;
  } catch (err) {
    await queryRunner.rollbackTransaction();
    throw new DatabaseError('DATABASE_ERROR');
  } finally {
    await queryRunner.release();
  }
};

const getBuyingPayment = async (dealNumber) => {
  try {
    return await queryRunner.query(
      `
  SELECT
  pi.url AS productImage,
  d.buying_commission AS commission,
  s.bid_price AS bidPrice
  FROM product_images pi
  JOIN sellings s
  ON pi.product_id = s.product_id
  JOIN deals d
  ON d.selling_id = s.id
  WHERE d.deal_number = ?
  `,
      [dealNumber]
    );
  } catch (err) {
    throw new DatabaseError('DATABASE_ERROR');
  }
};

module.exports = {
  createBuyPayment,
  createSellPayment,
  buyBidding,
  buyingAddress,
  updateSellbiddingInfo,
  getSellBidding,
  getBuyingPayment,
  getSellPayment,
};
