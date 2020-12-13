import * as express from 'express';
import Database from '../Database';

const router = express.Router();

router.get('/', async (req, res, next) => {
  const limit = Number(req.query.limit);
  const offset = Number(req.query.offset);

  const data = await Database.raw('SELECT WUS.*, K.*, US.* FROM `wykonana_usluga_serwisowa` WUS JOIN `usluga_serwisowa` US ON US.`id` = WUS.`usluga_serwisowa_id` JOIN `klient` K ON  K.`id` = WUS.`klient_id` ORDER BY `data_wykonania` DESC, `status` ASC LIMIT ? OFFSET ?', [limit, offset]);
  
  res.status(200).json(data[0]);
});

router.get('/klient/:id', async (req, res, next) => {
  const byUserId = req.params.id;
  const limit = Number(req.query.limit);
  const offset = Number(req.query.offset);

  const data = await Database.raw(' SELECT WUS.*, K.*, US.* FROM `wykonana_usluga_serwisowa` WUS JOIN `usluga_serwisowa` US ON US.`id` = WUS.`usluga_serwisowa_id` JOIN `klient` K ON K.`id` = WUS.`klient_id` WHERE K.`id` = ? ORDER BY `data_wykonania` DESC, `status` ASC LIMIT ? OFFSET ?', [byUserId, limit, offset]);
  
  res.status(200).json(data[0]);
});

export default router;
