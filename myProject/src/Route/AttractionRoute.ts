import { Request, Response } from 'express';
import { createAttraction } from '../Module/AttractionModule';

export const createAttractionRoute = async (req: Request, res: Response) => {
  try {
    const { name, attractionType, cityId } = req.body;

    const attractionData = {
      name,
      attractionType,
      cityId,
    };

    const createdAttraction = await createAttraction(attractionData);

    res.status(201).json({ message: 'Attraction created successfully', attraction: createdAttraction });
  } catch (error) {
    console.log('Failed to create Attraction:', error);
    res.status(500).json({ error: 'Failed to create Attraction' });
  }
};
