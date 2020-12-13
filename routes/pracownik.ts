import * as express from 'express';
import Database from '../Database';

const router = express.Router();

router.get('/', async (req, res, next) => {
  const limit = Number(req.query.limit);
  const offset = Number(req.query.offset);

  const data = await Database.raw('SELECT `id`, `typ_konta`, `imie`, `nazwisko`, `login`, `blokada` FROM `pracownik` WHERE `typ_konta` != "KIEROWNIK" ORDER BY `id` DESC LIMIT ? OFFSET ?', [limit, offset]);
  
  res.status(200).json(data[0]);
});

export default router;
