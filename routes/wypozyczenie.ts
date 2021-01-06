import * as express from 'express';
import Database from '../Database';

const router = express.Router();

router.get('/', async (req, res, next) => {
  const limit = Number(req.query.limit);
  const offset = Number(req.query.offset);

  const data = await Database.raw('SELECT `id`, `poczatek`, `koniec`, `koszt`, `naliczona_kaucja`, `status` FROM `wypozyczenie` ORDER BY `poczatek` DESC, `status` ASC LIMIT ? OFFSET ?', [limit, offset]);
  
  const totalRowsData = await Database.raw("SELECT COUNT(*) as totalRows FROM `wypozyczenie`;");

  res.status(200).json({rows: data[0], ...totalRowsData[0][0]});
});

router.get('/klient/:id', async (req, res, next) => {
  const limit = Number(req.query.limit);
  const offset = Number(req.query.offset);
  const byUserId = req.params.id;

  const data = await Database.raw('SELECT `id`, `poczatek`, `koniec`, `koszt`, `naliczona_kaucja`, `status` FROM `wypozyczenie` WHERE `klient_id` = ? ORDER BY `poczatek` DESC, `status` ASC LIMIT ? OFFSET ?', [byUserId, limit, offset]);
  
  const totalRowsData = await Database.raw("SELECT COUNT(*) as totalRows FROM `wypozyczenie` WHERE `klient_id` = ? ;", [byUserId]);

  if(data[0].length)
    res.status(200).json({rows: data[0], ...totalRowsData[0][0]});
  else res.status(404).end();
});

router.get('/:id', async (req, res, next) => {
  const id = req.params.id;

  const dataSprzet = await Database.raw('SELECT S.*, WS.kara, WS.opis_kary FROM `wypozyczenie` W JOIN `wypozyczony_sprzet` WS ON WS.`wypozyczenie_id` = W.`id` JOIN `sprzet` S ON S.`id` = WS.`sprzet_id` WHERE W.`id` = ?;', [id]);
  const dataWypozyczenie = await Database.raw('SELECT K.*, W.* FROM `wypozyczenie` W JOIN `klient` K ON K.`id` = W.`klient_id` WHERE W.`id` = ?', [id]);


  if(dataWypozyczenie[0].length)
  res.status(200).json({ ...dataWypozyczenie[0][0], sprzet: dataSprzet[0] });
  else res.status(404).end();
});

router.post('/', async (req, res, next) => {
  const klientId: number = req.body.klientId;
  const poczatek: string = req.body.poczatek;
  const koniec: string = req.body.koniec;
  const koszt: number = req.body.koszt;
  const naliczonaKaucja: number = req.body.naliczonaKaucja;
  const sprzetIds: number[] = req.body.sprzetIds;

  Database.transaction(async trx => {
    try {
      const data = await Database.raw('INSERT INTO `wypozyczenie` ( `klient_id`, `poczatek`, `koniec`, `koszt`, `naliczona_kaucja`, `status` ) VALUES( ?, ?, ?, ?, ?, "Rezerwacja (nowa)" );', [klientId, poczatek, koniec, koszt, naliczonaKaucja]);
      await Database.raw('INSERT INTO `wypozyczony_sprzet`( `sprzet_id`, `wypozyczenie_id`, `kara`, `opis_kary` ) VALUES' + sprzetIds.map(_ => '(?, (SELECT LAST_INSERT_ID()), 0, "")').join(',') +';', [...sprzetIds]);
      await Database.raw('UPDATE `sprzet` SET `blokada`="wypozyczenie" WHERE `id` IN ('+sprzetIds.map(_ => '?').join(',') +');', [...sprzetIds]);
      await trx.commit();

      res.status(201).send({id: data[0].insertId});
    } catch (error) {
      console.log('error', error)
      trx.rollback();
      res.status(400).end();
    }
  })
});

router.post('/:id', async (req, res, next) => {
  const id: number = Number(req.params.id);
  const status: string = req.body.status;
  const sprzety: any[] = req.body.sprzety;

  Database.transaction(async trx => {
    try {
      await Database.raw('UPDATE `wypozyczenie` SET `status`=? WHERE `id` = ?;', [status, id]);
      for (let i=0; i<sprzety.length; i++){
        await Database.raw('UPDATE `wypozyczony_sprzet` SET `kara`=?, `opis_kary`=? WHERE `id` = ?;', [sprzety[i].kara, sprzety[i].opisKary, sprzety[i].id]);
      }
      await trx.commit();
      res.status(201).end();
    } catch (error) {
      console.log('error', error)
      trx.rollback();
      res.status(400).end();
    }
  })
});

export default router;
