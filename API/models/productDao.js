const appDataSource = require('./appDataSource');
const { DatabaseError } = require('../utils/error');
const { bidStatusEnum } = require('./enum');
const ProductsQueryBuilder = require('./productQueryBuilder');

const productDetail = async (productId) => {
  try {
    const [productDetail] = await appDataSource.query(
      `
        SELECT 
            p.id productId,
            p.name productName,
            p.model_number modelNumber,
            c.name categoryName,
            p.original_price originalPrice,
            pi.url imageUrl,
            pa.age productAge,
            pl.level productLevel,
            l.likeCount
        FROM products p
        JOIN categories c ON p.category_id = c.id
        JOIN product_images pi ON p.id = pi.product_id
        JOIN product_ages pa ON p.product_age_id = pa.id
        JOIN product_levels pl ON p.product_level_id = pl.id
        LEFT JOIN (SELECT 
            product_id,
            COUNT(id) likeCount
         FROM likes
         GROUP BY product_id) l ON l.product_id = p.id
        WHERE p.id = ?
              `,
      [productId]
    );
    return productDetail;
  } catch (err) {
    throw new DatabaseError('DATABASE_ERROR');
  }
};

const isExistingProduct = async (productId) => {
  try {
    const [result] = await appDataSource.query(
      `SELECT EXISTS (
        SELECT
        id
        FROM products
        WHERE id = ?
        ) existing 
        `,
      [productId]
    );
    return !!parseInt(result.existing);
  } catch (err) {
    throw new DatabaseError('DATABASE_ERROR');
  }
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
  try {
    let queryclass = new ProductsQueryBuilder(
      categoryId,
      ageId,
      levelId,
      sort,
      sortorder
    ).build();

    const productList = await appDataSource.query(
      `
      SELECT
        products.id as productId,
        products.name as productName,
        products.model_number as productModelNumber,
        products.original_price as productOriginalPrice,
        product_ages.id as productAgeId,
        product_ages.age as productAge,
        product_levels.id as productLevelId,
        product_levels.level as productLevel,
        categories.id as categoryId,
        categories.name as categoryName,
        (SELECT
          product_images.url
         FROM product_images
         WHERE products.id = product_images.product_id
         ORDER BY product_images.url LIMIT 1) as productImage,
        (SELECT
          buyings.bid_price
         FROM buyings
         WHERE products.id = buyings.product_id
         ORDER BY buyings.bid_price LIMIT 1) as immediateSalePrice,
        (SELECT
          sellings.bid_price
         FROM sellings
         WHERE products.id = sellings.product_id
         ORDER BY sellings.bid_price LIMIT 1) as immediateBuyPrice,
         (SELECT count(id) from likes WHERE product_id = products.id GROUP BY product_id ORDER BY likes.product_id LIMIT 1) likeCount,
         (SELECT count(id) from reviews WHERE product_id = products.id GROUP BY product_id ORDER BY reviews.product_id LIMIT 1) reviewCount,
         (SELECT
          (buyings.bid_price - products.original_price)/products.original_price * 100
          FROM buyings JOIN deals ON deals.buying_id = buyings.id
          WHERE buyings.product_id = products.id LIMIT 1
          ) as premiumPercent
        FROM product_ages 
        RIGHT JOIN products ON product_ages.id = products.product_age_id
        LEFT JOIN product_levels ON products.product_level_id = product_levels.id
        LEFT JOIN categories ON products.category_id = categories.id
        LEFT JOIN product_images ON products.id = product_images.product_id
        LEFT JOIN likes ON products.id = likes.product_id
        LEFT JOIN reviews ON products.id = reviews.product_id
        LEFT JOIN buyings ON products.id = buyings.product_id
        LEFT JOIN deals ON buyings.id = deals.buying_id
        LEFT JOIN sellings ON deals.selling_id = sellings.id
        ${queryclass.whereCondition}
        GROUP BY products.id
        ORDER BY ${queryclass.sortCondition}
        LIMIT ? OFFSET ?
    `,
      [limit, offset]
    );
    return productList;
  } catch (err) {
    throw new DatabaseError('DATABASE_ERROR');
  }
};

const getProductByLike = async (userId) => {
  try {
    const bid = bidStatusEnum.bid;

    return await appDataSource.query(
      `SELECT
      products.id as productId,
      products.name as productName,
      products.model_number as productModelNumber,
      categories.name as categoryName,
      product_images.url  as productImage,
      buyings.immediateSalePrice
      FROM products
      JOIN likes l ON l.product_id = products.id
      LEFT JOIN categories ON products.category_id = categories.id
      LEFT JOIN product_images ON products.id = product_images.product_id
      LEFT JOIN (SELECT
      b.product_id,
      MAX(bid_price) AS immediateSalePrice
      FROM buyings b
      WHERE b.bid_status_id = ?
      GROUP BY b.product_id) AS buyings
      ON products.id = buyings.product_id
      WHERE l.user_id = ?
    `,
      [bid, userId]
    );
  } catch (err) {
    throw new DatabaseError('DATABASE_ERROR');
  }
};

module.exports = {
  getProductList,
  productDetail,
  isExistingProduct,
  getProductByLike,
};
