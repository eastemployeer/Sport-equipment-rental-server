import express from 'express';
import wypozyczenieRouter from './wypozyczenie';

const router = express.Router();

router.use('/wypozyczenie', wypozyczenieRouter);

export default router;