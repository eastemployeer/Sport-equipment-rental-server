import * as express from 'express';
import Database from '../Database';

const router = express.Router();

router.get('/', async (req, res, next) => {
  const limit = Number(req.query.limit);
  const offset = Number(req.query.offset);

  const data = await Database.raw('SELECT `id`, `nazwa`, `szacowany_czas_wykonania`, `cena` FROM `usluga_serwisowa` WHERE `usuniete` = 0 LIMIT ? OFFSET ?', [limit, offset]);
  
  res.status(200).json(data[0]);
});

router.post('/', async (req, res, next) => {
  const nazwa: string = req.body.nazwa;
  const czas: string = req.body.czas;
  const cena: string = req.body.cena;

  try {
    const data = await Database.raw('INSERT INTO `usluga_serwisowa`(`nazwa`,`szacowany_czas_wykonania`,`cena`)VALUES(?, ?, ?);', [nazwa, czas, cena]);
  
    res.status(201).send({id: data[0].insertId});
  } catch (error) {
    res.status(400).end();
  }
});

router.post('/:id', async (req, res, next) => {
  const id = req.params.id;
  const nazwa: string = req.body.nazwa;
  const czas: string = req.body.czas;
  const cena: string = req.body.cena;

  try {
    const data = await Database.raw('UPDATE `usluga_serwisowa` SET `nazwa` = ?,`szacowany_czas_wykonania` = ?,`cena` = ? WHERE `id` = ?;', [nazwa, czas, cena, id ]);
    
    if(data[0].affectedRows)
      res.status(201).end();
    else 
      res.status(400).end();
  } catch (error) {
    res.status(400).end();
  }
});

router.delete('/:id', async (req, res, next) => {
  const id = req.params.id;

  try {
    const data = await Database.raw('UPDATE`usluga_serwisowa` SET `usuniete` = 1 WHERE `id` = ?', [id]);
    
    if(data[0].affectedRows)
      res.status(201).end();
    else 
      res.status(400).end();
  } catch (error) {
    res.status(400).end();
  }
});

export default router;
