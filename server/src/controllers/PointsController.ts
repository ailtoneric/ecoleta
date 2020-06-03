import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {
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
      image: 'image-fake',
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