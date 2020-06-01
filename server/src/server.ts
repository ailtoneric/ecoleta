import express from 'express';

const app = express();

app.get('/users', (request, response) => {
  response.json([ 'Ailton', 'Eric', 'Lacerda' ]);
});

app.listen(3333);