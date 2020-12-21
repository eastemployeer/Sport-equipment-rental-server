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
  
  if(data[0].length)
    res.status(200).json(data[0]);
  else res.status(404).end();
});

router.get('/:id', async (req, res, next) => {
  const id = req.params.id;

  const data = await Database.raw('SELECT WUS.*,K.`id`,K.`imie`,K.`nazwisko`,K.`email`,K.`telefon`,US.* FROM `wykonana_usluga_serwisowa` WUS JOIN `usluga_serwisowa` US ON US.`id` = WUS.`usluga_serwisowa_id` JOIN `klient` K ON K.`id` = WUS.`klient_id` WHERE WUS.`id` = ?;', [id]);

  if(data[0].length)
    res.status(200).json(data[0][0]);
  else res.status(404).end();
});

router.post('/', async (req, res, next) => {
  const email: string = req.body.email;
  const uslugaSerwisowaId: string = req.body.uslugaSerwisowaId;
  const nazwaSprzetu: string = req.body.nazwaSprzetu;
  const opis: string = req.body.opis;
  const dataWykonania: string = req.body.dataWykonania;

  try {
    const data = await Database.raw('INSERT INTO `wykonana_usluga_serwisowa` (`klient_id`,`usluga_serwisowa_id`,`nazwa_sprzetu`,`opis`,`data_wykonania`,`status`)VALUES((SELECT`id`FROM`klient`WHERE`email` = ?),?,?,?,?,"W trakcie")', [email, uslugaSerwisowaId, nazwaSprzetu, opis, dataWykonania]);
  
    res.status(201).send({id: data[0].insertId});
  } catch (error) {
    console.log('error', error)
    res.status(400).end();
  }
});

router.post('/:id', async (req, res, next) => {
  const id = req.params.id;
  const status: string = req.body.status;

  try {
    const data = await Database.raw('UPDATE `wykonana_usluga_serwisowa` SET `status`=? WHERE `id` = ?;', [status, id]);
    
    if(data[0].affectedRows)
      res.status(201).end();
    else 
      res.status(400).end();
  } catch (error) {
    res.status(400).end();
  }
});

export default router;
