import * as express from 'express';
import Database from '../Database';

const router = express.Router();

router.post('/klient', async (req, res, next) => {
  const email = String(req.body.email);
  const password = String(req.body.password);

  const data = await Database.raw("SELECT * FROM `klient` WHERE `email` = ?;", [email]);

  if(password === data[0][0].haslo) 
    res.status(202).json({
      token: '1',
      user: data[0][0]
    });
  else 
    res.status(400).end();
});

router.post('/pracownik', async (req, res, next) => {
  const login = String(req.body.login);
  const password = String(req.body.password);

  const data = await Database.raw("SELECT * FROM `pracownik` WHERE `blokada`!=1 AND `login` = ?;", [login]);

  if(data[0].length && password === data[0][0].haslo) 
    res.status(202).json({
      token: '1',
      user: data[0][0]
    });
  else 
    res.status(400).end();
});

export default router;
