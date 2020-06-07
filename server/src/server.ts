import express from 'express';
import cors from 'cors';
import path from 'path';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use(
  '/resources',
  express.static(path.resolve(__dirname, '..', 'resources', 'svg'))
);
app.use(
  '/uploads',
  express.static(path.resolve(__dirname, '..', 'resources', 'uploads'))
);

app.listen(3333);