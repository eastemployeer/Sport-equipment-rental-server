import * as express from 'express';
import Database from '../Database';

const router = express.Router();

router.get('/', async (req, res, next) => {
  const limit = Number(req.query.limit);
  const offset = Number(req.query.offset);
  const showEnded = req.query.showEnded === 'true';

  const data = await Database.raw("SELECT s.id, s.rodzaj_sprzetu, s.cecha_1_label, s.cecha_1_value, s.cecha_2_label, s.cecha_2_value, s.cecha_3_label, s.cecha_3_value, n.data, n.opis, n.status FROM pwrwypozyczalnia.sprzet s JOIN pwrwypozyczalnia.naprawa n ON (n.sprzet_id=s.id) WHERE n.status " + (showEnded? "" : "!" )+ "= 'zakończona' LIMIT ? OFFSET ?;", [limit, offset]);
  
  res.json(data[0]).status(200);
});

export default router;
