import * as express from 'express';
import Database from '../Database';

const router = express.Router();

router.get('/', async (req, res, next) => {
  const limit = Number(req.query.limit);
  const offset = Number(req.query.offset);

  const data = await Database.raw('SELECT `id`, `nazwa`, `szacowany_czas_wykonania`, `cena` FROM `usluga_serwisowa` WHERE `usuniete` = 0 LIMIT ? OFFSET ?', [limit, offset]);
  
  res.json(data[0]).status(200);
});

export default router;
