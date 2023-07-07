const appDataSource = require('./appDataSource');
const { DatabaseError } = require('../utils/error');

const getUserByKakaoId = async (kakaoId) => {
  try {
    const [user] = await appDataSource.query(
      `
    SELECT
      id,
      email,
      nickname
    FROM users
    WHERE kakao_id  = ?
    `,
      [kakaoId]
    );

    return user;
  } catch (err) {
    throw new DatabaseError('DataSource_Error');
  }
};

const getUserById = async (userId) => {
  try {
    const [user] = await appDataSource.query(
      `
      SELECT
        id,
        email,
        nickname
      FROM users
      WHERE id = ?
      `,
      [userId]
    );
    return user;
  } catch (err) {
    throw new DatabaseError('DataSource_Error');
  }
};

const createUser = async (kakaoId, nickname, email) => {
  try {
    await appDataSource.query(
      `
      INSERT INTO users(
        kakao_id,
        nickname,
        email
      )
      VALUES (?, ?, ?)
      `,
      [kakaoId, nickname, email]
    );

    const user = await appDataSource.query(
      `
      SELECT *
      FROM users
      WHERE kakao_id = ?
      `,
      [kakaoId]
    );
    return user;
  } catch (err) {
    throw new DatabaseError('DataSource_Error');
  }
};
const inputAddress = async (userId, address, detailAddress, receiver) => {
  try {
    const inputAddress = await appDataSource.query(
      `
  INSERT INTO addressses
   (user_id,address,detail_address,receiver)
   VALUES(?,?,?,?)
  `,
      [userId, address, detailAddress, receiver]
    );

    return inputAddress.insertId;
  } catch (err) {
    throw new DatabaseError('DataSource_Error', 400);
  }
};

const getAddressByUserId = async (userId) => {
  try {
    return await appDataSource.query(
      `
  SELECT
  address,
  detail_address,
  receiver,
  id AS addressId
  FROM addressses
  WHERE user_id =?
  `,
      [userId]
    );
  } catch (err) {
    throw new DatabaseError('DataSource_Error', 400);
  }
};

const inputNewAccount = async (accountNumber, userId) => {
  try {
    const insertInfo = await appDataSource.query(
      `
    INSERT INTO account_numbers (
      user_id,
      account_number
    )
    VALUES (?, ?)
    `,
      [userId, accountNumber]
    );
    return insertInfo.insertId;
  } catch (err) {
    throw new DatabaseError('DataSource_Error', 400);
  }
};

const inputNewCard = async (cardNumber, userId) => {
  try {
    const insertInfo = await appDataSource.query(
      `
      INSERT INTO card_numbers (
        user_id,
        card_number
      )
      VALUES (?, ?)
    `,
      [userId, cardNumber]
    );
    return insertInfo.insertId;
  } catch (err) {
    throw new DatabaseError('DataSource_Error', 400);
  }
};

const getAccountListByUser = async (userId) => {
  try {
    const accountList = await appDataSource.query(
      `
      SELECT
        id accountId,
        account_number accountNumber
      FROM account_numbers
      WHERE user_id = ?
      ORDER BY id DESC
      `,
      [userId]
    );

    return accountList;
  } catch (err) {
    throw new DatabaseError('DataSource_Error', 400);
  }
};

const getCardListByUser = async (userId) => {
  try {
    const cardList = await appDataSource.query(
      `
      SELECT
        id cardId,
        card_number cardNumber
      FROM card_numbers
      WHERE user_id = ?
      ORDER BY id DESC
      `,
      [userId]
    );

    return cardList;
  } catch (err) {
    throw new DatabaseError('DataSource_Error', 400);
  }
};

module.exports = {
  getUserByKakaoId,
  getUserById,
  createUser,
  inputAddress,
  getAddressByUserId,
  inputNewAccount,
  inputNewCard,
  getAccountListByUser,
  getCardListByUser,
};
