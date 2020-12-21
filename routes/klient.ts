import * as express from 'express';
import Database from '../Database';

const router = express.Router();

router.get('/:id', async (req, res, next) => {
  const id = req.params.id;

  const data = await Database.raw('SELECT `id`,`imie`,`nazwisko`,`email`,`telefon`FROM`klient`WHERE`id` = ?;', [id]);

  if(data[0].length)
    res.status(200).json({ ...data[0][0] });
  else res.status(404).end();
});

router.get('/email/:email', async (req, res, next) => {
  const email = req.params.email;

  const data = await Database.raw('SELECT `id`,`imie`,`nazwisko`,`email`,`telefon` FROM `klient` WHERE `email`= ?;', [email]);

  if(data[0].length)
    res.status(200).json({ ...data[0][0] });
  else res.status(404).end();
});

router.post('/', async (req, res, next) => {
  const imie: string = req.body.imie;
  const nazwisko: string = req.body.nazwisko;
  const email: string = req.body.email;
  const haslo: string = req.body.haslo;
  const telefon: string = req.body.telefon;

  try {
    const data = await Database.raw('INSERT INTO `klient`(`imie`,`nazwisko`,`email`,`haslo`,`telefon`)VALUES(?,?,?,?,?);', [imie, nazwisko, email, haslo, telefon]);
  
    res.status(201).send({id: data[0].insertId});
  } catch (error) {
    res.status(400).end();
  }
});

export default router;
