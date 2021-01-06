import * as express from 'express';
import Database from '../Database';

const router = express.Router();

router.get('/', async (req, res, next) => {
  const sezon = String(req.query.sezon);
  const limit = Number(req.query.limit);
  const offset = Number(req.query.offset);
  const blokada = req.query.blokada;

  let totalRowsData, data;

  if(blokada !== undefined)  {
    data = await Database.raw("SELECT s.id, s.rodzaj_sprzetu, s.przeznaczenie, s.cecha_1_label,s.cecha_1_value, s.cecha_2_label,s.cecha_2_value, s.cecha_3_label,s.cecha_3_value, s.cecha_4_label,s.cecha_4_value, s.cena_wypozyczenia_dzien FROM sprzet s JOIN rodzaj_sprzetu r ON (s.rodzaj_sprzetu=r.nazwa) WHERE s.blokada=? AND r.rodzaj_sezonu=? LIMIT ? OFFSET ?;", [String(blokada), sezon, limit, offset]);
    totalRowsData = await Database.raw("SELECT COUNT(*) as totalRows FROM sprzet s JOIN rodzaj_sprzetu r ON (s.rodzaj_sprzetu=r.nazwa) WHERE s.blokada=? AND r.rodzaj_sezonu=?;", [String(blokada), sezon]);
  } else {
    data = await Database.raw("SELECT s.id, s.rodzaj_sprzetu, s.przeznaczenie, s.cecha_1_label,s.cecha_1_value, s.cecha_2_label,s.cecha_2_value, s.cecha_3_label,s.cecha_3_value, s.cecha_4_label,s.cecha_4_value, s.cena_wypozyczenia_dzien FROM sprzet s JOIN rodzaj_sprzetu r ON (s.rodzaj_sprzetu=r.nazwa) WHERE r.rodzaj_sezonu=? LIMIT ? OFFSET ?;", [sezon, limit, offset]);
    totalRowsData = await Database.raw("SELECT COUNT(*) as totalRows FROM sprzet s JOIN rodzaj_sprzetu r ON (s.rodzaj_sprzetu=r.nazwa) WHERE r.rodzaj_sezonu=?;", [sezon]);
  }
  
  res.status(200).json({rows: data[0], ...totalRowsData[0][0]});
});

router.get('/rodzaj', async (req, res, next) => {
  try {
    const data = await Database.raw('SELECT `nazwa`, `rodzaj_sezonu` FROM `rodzaj_sprzetu` WHERE 1;');
  
    res.status(200).send(data[0]);
  } catch (error) {
    res.status(400).end();
  }
});

router.get('/:id', async (req, res, next) => {
  const id = req.params.id;

  const data = await Database.raw('SELECT s.id,s.wartosc_sprzetu, s.rocznik, s.blokada, s.rodzaj_sprzetu, s.przeznaczenie, s.cecha_1_label,s.cecha_1_value, s.cecha_2_label,s.cecha_2_value, s.cecha_3_label,s.cecha_3_value, s.cecha_4_label,s.cecha_4_value, s.cena_wypozyczenia_dzien, r.nazwa, r.rodzaj_sezonu FROM sprzet s JOIN rodzaj_sprzetu r ON s.rodzaj_sprzetu = r.nazwa  WHERE s.id = ?', [id]);

  if(data[0].length)
    res.status(200).json({ ...data[0][0] });
  else res.status(404).end();
})

router.post('/', async (req, res, next) => {
  const rodzajSprzetu: string = req.body.rodzajSprzetu;
  const przeznaczenie: string = req.body.przeznaczenie;
  const cecha_1_label: string = req.body.cecha_1_label;
  const cecha_1_value: string = req.body.cecha_1_value;
  const cecha_2_label: string = req.body.cecha_2_label;
  const cecha_2_value: string = req.body.cecha_2_value;
  const cecha_3_label: string = req.body.cecha_3_label;
  const cecha_3_value: string = req.body.cecha_3_value;
  const cecha_4_label: string = req.body.cecha_4_label;
  const cecha_4_value: string = req.body.cecha_4_value;
  const cena: number = req.body.cena;
  const rocznik: string = req.body.rocznik;
  const wartoscSprzetu: number = req.body.wartoscSprzetu;

  try {
    const data = await Database.raw('INSERT INTO sprzet(rodzaj_sprzetu,przeznaczenie,cecha_1_label,cecha_1_value,cecha_2_label,cecha_2_value,cecha_3_label,cecha_3_value,cecha_4_label,cecha_4_value,cena_wypozyczenia_dzien,blokada,rocznik,wartosc_sprzetu) values (?,?,?,?,?,?,?,?,?,?,?,"dostepny",?,?);', [rodzajSprzetu, przeznaczenie, cecha_1_label, cecha_1_value, cecha_2_label, cecha_2_value, cecha_3_label, cecha_3_value, cecha_4_label, cecha_4_value, cena, rocznik, wartoscSprzetu]);
  
    res.status(201).send({id: data[0].insertId});
  } catch (error) {
    res.status(400).end();
  }
});

router.post('/:id', async (req, res, next) => {
  const id: string = req.params.id;
  const rodzajSprzetu: string = req.body.rodzajSprzetu;
  const przeznaczenie: string = req.body.przeznaczenie;
  const cecha_1_label: string = req.body.cecha_1_label;
  const cecha_1_value: string = req.body.cecha_1_value;
  const cecha_2_label: string = req.body.cecha_2_label;
  const cecha_2_value: string = req.body.cecha_2_value;
  const cecha_3_label: string = req.body.cecha_3_label;
  const cecha_3_value: string = req.body.cecha_3_value;
  const cecha_4_label: string = req.body.cecha_4_label;
  const cecha_4_value: string = req.body.cecha_4_value;
  const cena: number = req.body.cena;
  const rocznik: string = req.body.rocznik;
  const wartoscSprzetu: number = req.body.wartoscSprzetu;
  const blokada: string = req.body.blokada;

  try {
    const data = [{ affectedRows: 1 }];//await Database.raw('INSERT INTO sprzet(rodzaj_sprzetu,przeznaczenie,cecha_1_label,cecha_1_value,cecha_2_label,cecha_2_value,cecha_3_label,cecha_3_value,cecha_4_label,cecha_4_value,cena_wypozyczenia_dzien,blokada,rocznik,wartosc_sprzetu) values (?,?,?,?,?,?,?,?,?,?,?,"dostepny",?,?);', [rodzajSprzetu, przeznaczenie, cecha_1_label, cecha_1_value, cecha_2_label, cecha_2_value, cecha_3_label, cecha_3_value, cecha_4_label, cecha_4_value, cena, rocznik, wartoscSprzetu]);
  
    if(data[0].affectedRows)
      res.status(201).end();
    else 
      res.status(400).end();
  } catch (error) {
    res.status(400).end();
  }
});

router.post('/rodzaj', async (req, res, next) => {
  const nazwa: string = req.body.nazwa;
  const rodzajSezonu: string = req.body.rodzajSezonu;

  try {
    const data = await Database.raw('INSERT INTO rodzaj_sprzetu (nazwa,rodzaj_sezonu) VALUES (?, ?);', [nazwa, rodzajSezonu]);
  
    res.status(201).send({id: data[0].insertId});
  } catch (error) {
    res.status(400).end();
  }
});

router.delete('/:id', async (req, res, next) => {
  const id = req.params.id;

  try {
    // TODO:
    const data: any = [{}];//await Database.raw('UPDATE`usluga_serwisowa` SET `usuniete` = 1 WHERE `id` = ?', [id]);
    
    if(data[0].affectedRows)
      res.status(201).end();
    else 
      res.status(400).end();
  } catch (error) {
    res.status(400).end();
  }
});


export default router;
