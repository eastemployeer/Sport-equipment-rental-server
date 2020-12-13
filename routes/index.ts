import express from 'express';
import klientRouter from './klient';
import loginRouter from './login';
import naprawaRouter from './naprawa';
import pracownikRouter from './pracownik';
import sprzetRouter from './sprzet';
import uslugaSerwisowaRouter from './uslugaSerwisowa';
import wykonanaUslugaSerwisowaRouter from './wykonanaUslugaSerwisowa';
import wypozyczenieRouter from './wypozyczenie';

const router = express.Router();

router.use('/klient', klientRouter);
router.use('/login', loginRouter);
router.use('/naprawa', naprawaRouter);
router.use('/pracownik', pracownikRouter);
router.use('/sprzet', sprzetRouter);
router.use('/uslugaSerwisowa', uslugaSerwisowaRouter);
router.use('/wykonanaUslugaSerwisowa', wykonanaUslugaSerwisowaRouter);
router.use('/wypozyczenie', wypozyczenieRouter);

export default router;