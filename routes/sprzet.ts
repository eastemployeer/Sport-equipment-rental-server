import * as express from 'express';
import Database from '../Database';

const router = express.Router();

router.get('/', async (req, res, next) => {
  const sezon = String(req.query.sezon);
  const limit = Number(req.query.limit);
  const offset = Number(req.query.offset);

  const data = await Database.raw("SELECT s.id, s.rodzaj_sprzetu, s.przeznaczenie, s.cecha_1_label,s.cecha_1_value, s.cecha_2_label,s.cecha_2_value, s.cecha_3_label,s.cecha_3_value, s.cecha_4_label,s.cecha_4_value, s.cena_wypozyczenia_dzien FROM pwrwypozyczalnia.sprzet s JOIN rodzaj_sprzetu r ON (s.rodzaj_sprzetu=r.nazwa) WHERE s.blokada='dostepny' AND r.rodzaj_sezonu=? LIMIT ? OFFSET ?;", [sezon, limit, offset]);

  const totalRowsData = await Database.raw("SELECT COUNT(*) as totalRows FROM sprzet s JOIN rodzaj_sprzetu r ON (s.rodzaj_sprzetu=r.nazwa) WHERE s.blokada='dostepny' AND r.rodzaj_sezonu=?;", [sezon]);
  
  res.json({rows: data[0], ...totalRowsData[0][0]}).status(200);
});

export default router;
