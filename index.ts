import express from 'express';
import bodyParser from 'body-parser';
import indexRoutes from './routes/index';
import httpLogger from './helpers/httpLogger';

const app = express();
const port = 3000;

app.use(httpLogger());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', indexRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
