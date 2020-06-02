import express from 'express';
import path from 'path';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(routes);

app.use(
  '/resources',
  express.static(path.resolve(__dirname, '..', 'resources', 'svg'))
);

app.listen(3333);