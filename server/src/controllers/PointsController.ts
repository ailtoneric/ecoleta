import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {
  async show (request: Request, response: Response) {
    const { id } = request.params;

    const point = await knex('points').where('id', id).first();

    if (!point) {
      return response.status(400).json({ message: 'Collection Point not found' });
    }

    const items = await knex('items')
      .join('point_items', 'point_items.item_id', '=', 'items.id')
      .where('point_items.point_id', id)
      .select('items.title'); 

    return response.json({ point, items });
  }

  async index (request: Request, response: Response) {
    const { city, uf, items } = request.query;

    const parsedItems = String(items)
      .split(',')
      .map(item => Number(item.trim()));

    const point = await knex('points')
      .join('point_items', 'point_items.point_id', '=', 'points.id')
      .whereIn('point_items.item_id', parsedItems)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('points.*');

    return response.json(point);
  }

  async create (request: Request, response: Response) {
    const {
      image,
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items
    } = request.body;
  
    const trx = await knex.transaction();
    
    const point = {
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf
    };

    const insertedId = await trx('points').insert(point);
  
    const point_id = insertedId[0];
  
    const pointItems = items.map((item_id: number) => {
      return {
        item_id,
        point_id
      };
    });
  
    await trx('point_items').insert(pointItems);
  
    await trx.commit();
  
    return response.json({
      id: point_id,
      ...point
    });
  }
}

export default PointsController;