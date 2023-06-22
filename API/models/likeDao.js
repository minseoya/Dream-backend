const appDataSource = require('./appDataSource');
const { DatabaseError } = require('../utils/error');

const isLike = async ({ proudctId, userId }) => {
  try {
    const [isLike] = await appDataSource.query(
      `SELECT
      id
      FROM likes
      WHERE product_id = ?
      AND user_id = ?`,
      [proudctId, userId]
    );

    if (!isLike) return false;

    return true;
  } catch (err) {
    throw new DatabaseError('DATABASE_ERROR');
  }
};

const createLike = async ({ proudctId, userId }) => {
  try {
    return await appDataSource.query(
      `INSERT INTO likes(
          product_id,
          user_id
        ) VALUES (?,?)
      `,
      [proudctId, userId]
    );
  } catch (err) {
    throw new DatabaseError('DATABASE_ERROR');
  }
};

const deleteLike = async ({ proudctId, userId }) => {
  try {
    return await appDataSource.query(
      `DELETE FROM likes
        WHERE product_id =?
        AND user_id =?
        `,
      [proudctId, userId]
    );
  } catch (err) {
    throw new DatabaseError('DATABASE_ERROR');
  }
};

module.exports = { isLike, createLike, deleteLike };
