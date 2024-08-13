/* eslint-disable @typescript-eslint/no-unused-vars -- Remove when used */
import 'dotenv/config';
import express from 'express';
import pg from 'pg';
import path from 'path';
import { ClientError, errorMiddleware } from './lib/index.js';
import { Series, Smiskis, ShoppingCartItem } from './lib/data.js';

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express();
// Create paths for static directories
const reactStaticDir = new URL('../client/dist', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;
app.use(express.static(reactStaticDir));
// Static directory for file uploads server/public/
app.use(express.static(uploadsStaticDir));
app.use(express.json());

// get all series
app.get('/api/series', async (req, res, next) => {
  try {
    const sql = `
    select * from series`;
    const result = await db.query<Series>(sql);

    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

// get all smiskis
app.get('/api/smiskis', async (req, res, next) => {
  try {
    const sql = `
    select * from smiskis`;
    const result = await db.query<Smiskis>(sql);

    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

// get series by id
app.get('/api/series/:seriesId', async (req, res, next) => {
  try {
    const { seriesId } = req.params;
    if (!Number.isInteger(+seriesId)) {
      throw new ClientError(400, 'seriesId must be a integer');
    }
    const sql = `
    select * from series
    where "seriesId" = $1`;
    const params = [seriesId];
    const result = await db.query<Series>(sql, params);
    const [series] = result.rows;
    if (!series) throw new ClientError(400, `Series ${seriesId} not found.`);
    res.json(series);
  } catch (err) {
    next(err);
  }
});

// get smiskis by id
app.get('/api/smiskis/:smiskisId', async (req, res, next) => {
  try {
    const { smiskisId } = req.params;
    if (!Number.isInteger(+smiskisId)) {
      throw new ClientError(400, 'smiskisId must be a integer');
    }
    const sql = `
    select * from smiskis
    where "smiskisId" = $1`;
    const params = [smiskisId];
    const result = await db.query<Smiskis>(sql, params);
    const [smiskis] = result.rows;
    if (!smiskis) throw new ClientError(400, `Smiskis ${smiskisId} not found.`);
    res.json(smiskis);
  } catch (err) {
    next(err);
  }
});

// get smiskis in specific series
app.get('/api/series/:seriesId/smiskis', async (req, res, next) => {
  const { seriesId } = req.params;
  if (!Number.isInteger(+seriesId)) {
    throw new ClientError(400, 'seriesId must be an integer');
  }
  try {
    const sql = `
      select * from smiskis
      where "seriesId" = $1`;
    const params = [seriesId];
    const result = await db.query(sql, params);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

// add item to cart
app.post('/api/shoppingCartItems', async (req, res, next) => {
  try {
    const { seriesId, quantity, imageUrl } = req.body;

    const sql = `
      insert into "shoppingCartItems" ("seriesId", "quantity", "imageUrl")
      values ($1, $2, $3)
      returning *`;
    const params = [seriesId, quantity, imageUrl];
    const result = await db.query(sql, params);
    const [shoppingCartItems] = result.rows;
    res.status(201).json(shoppingCartItems);
  } catch (err) {
    next(err);
  }
});

// get all items in cart

app.get('/api/shoppingCartItems', async (req, res, next) => {
  try {
    const sql = `select * from "shoppingCartItems" join "series" using ("seriesId")`;
    const result = await db.query<ShoppingCartItem>(sql);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

// update shopping cart item by id
app.put(
  '/api/shoppingCartItems/:shoppingCartItemsId',
  async (req, res, next) => {
    try {
      const { shoppingCartItemsId } = req.params;
      const { quantity } = req.body;
      const sql = `
    update "shoppingCartItems"
    set "quantity" = $1
    where "shoppingCartItemsId" = $2
    returning *`;
      const params = [quantity, shoppingCartItemsId];
      const result = await db.query(sql, params);
      const [shoppingCartItem] = result.rows;
      if (!shoppingCartItem) {
        throw new ClientError(
          404,
          `Shopping cart item ${shoppingCartItemsId} not found`
        );
      }
      res.json(shoppingCartItem);
    } catch (err) {
      next(err);
    }
  }
);

// delete item from cart
app.delete(
  '/api/shoppingCartItems/:shoppingCartItemsId',
  async (req, res, next) => {
    try {
      const { shoppingCartItemsId } = req.params;
      const sql = `
    DELETE FROM "shoppingCartItems"
    WHERE "shoppingCartItemsId" = $1
    RETURNING *`;
      const params = [shoppingCartItemsId];
      const result = await db.query(sql, params);
      const [deletedItem] = result.rows;
      if (!deletedItem) {
        throw new ClientError(
          404,
          `Shopping cart item ${shoppingCartItemsId} not found`
        );
      }
      res.json(deletedItem);
    } catch (err) {
      next(err);
    }
  }
);

// delete item in cart with seriesId
app.delete('/api/shoppingCartItems/:seriesId', async (req, res, next) => {
  try {
    const { seriesId } = req.params;
    const sql = `
    DELETE FROM "shoppingCartItems"
    WHERE "seriesId" = $1
    RETURNING *`;
    const params = [seriesId];
    const result = await db.query(sql, params);
    const [deletedItem] = result.rows;
    if (!deletedItem) {
      throw new ClientError(
        404,
        `Shopping cart item with seriesId ${seriesId} not found`
      );
    }
    res.json(deletedItem);
  } catch (err) {
    next(err);
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(reactStaticDir, 'index.html'));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log('Listening on port', process.env.PORT);
});
