import express from 'express';
import knex from './database/connection';

const routes = express.Router();

routes.get('/items', async (request, response) => {
  const items = await knex('items').select('*');

  const serializedItems = items.map(item => {
    return {
      "title": item.title,
      "image-url": `http://localhost:3333/resources/${item.image}`,
    };
  });

  return response.json(serializedItems);
})

export default routes;