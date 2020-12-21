import * as express from 'express';
import Database from '../Database';

const router = express.Router();

router.get('/', async (req, res, next) => {
  const limit = Number(req.query.limit);
  const offset = Number(req.query.offset);
  const showEnded = req.query.showEnded === 'true';

  const data = await Database.raw("SELECT s.id, s.rodzaj_sprzetu, s.cecha_1_label, s.cecha_1_value, s.cecha_2_label, s.cecha_2_value, s.cecha_3_label, s.cecha_3_value, n.data, n.opis, n.status FROM pwrwypozyczalnia.sprzet s JOIN pwrwypozyczalnia.naprawa n ON (n.sprzet_id=s.id) WHERE n.status " + (showEnded? "" : "!" )+ "= 'zakończona' LIMIT ? OFFSET ?;", [limit, offset]);
  
  res.status(200).json(data[0]);
});

router.post('/', async (req, res, next) => {
  const sprzetId: number = req.body.sprzetId;
  const koszt: number = req.body.koszt;
  const data: string = req.body.data;
  const opis: string = req.body.opis;

  Database.transaction(async trx => {
    try {
      const rawData = await Database.raw('INSERT INTO naprawa (sprzet_id,koszt,data,opis,status) VALUES(?,?,?,?,"rozpoczeta");', [sprzetId, koszt, data, opis]);
      await Database.raw('UPDATE pwrwypozyczalnia.sprzet SET blokada="zablokowano przez serwisanta" WHERE id=?;', [sprzetId]);
      await trx.commit();

      res.status(201).send({id: rawData[0].insertId});
    } catch (error) {
      trx.rollback();
      res.status(400).end();
    }
  })
});

export default router;
