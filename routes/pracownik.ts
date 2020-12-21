import * as express from 'express';
import Database from '../Database';

const router = express.Router();

router.get('/', async (req, res, next) => {
  const limit = Number(req.query.limit);
  const offset = Number(req.query.offset);

  const data = await Database.raw('SELECT `id`, `typ_konta`, `imie`, `nazwisko`, `login`, `blokada` FROM `pracownik` WHERE `typ_konta` != "KIEROWNIK" ORDER BY `id` DESC LIMIT ? OFFSET ?', [limit, offset]);
  
  res.status(200).json(data[0]);
});

router.get('/:id', async (req, res, next) => {
  const id = req.params.id;

  const data = await Database.raw('SELECT`id`,`typ_konta`,`imie`,`nazwisko`,`login`,`blokada`FROM`pracownik`WHERE`id` = ?;', [id]);

  if(data[0].length)
    res.status(200).json(data[0][0]);
  else res.status(404).end();
});

router.post('/', async (req, res, next) => {
  const typKonta: string = req.body.typKonta;
  const imie: string = req.body.imie;
  const nazwisko: string = req.body.nazwisko;
  const login: string = req.body.login;
  const haslo: string = req.body.haslo;

  try {
    const data = await Database.raw('INSERT INTO `pracownik`(`typ_konta`,`imie`,`nazwisko`,`login`,`haslo`,`blokada`)VALUES(?,?,?,?,?,0);', [typKonta, imie, nazwisko, login, haslo]);
  
    res.status(201).send({id: data[0].insertId});
  } catch (error) {
    res.status(400).end();
  }
});

router.post('/:id', async (req, res, next) => {
  const id = req.params.id;
  const typKonta: string = req.body.typKonta;
  const imie: string = req.body.imie;
  const nazwisko: string = req.body.nazwisko;
  const login: string = req.body.login;
  const haslo: string = req.body.haslo;
  const blokada: string = req.body.blokada;

  try {
    const data = await Database.raw('UPDATE `pracownik` SET `typ_konta` = ?,`imie` = ?,`nazwisko` = ?,`login` = ?,`haslo` = ?,`blokada` = ? WHERE`id` = ?;', [typKonta, imie, nazwisko, login, haslo, blokada, id ]);
    
    if(data[0].affectedRows)
      res.status(201).end();
    else 
      res.status(400).end();
  } catch (error) {
    res.status(400).end();
  }
});

export default router;
