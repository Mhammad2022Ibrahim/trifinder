import { Request, Response } from 'express';
import { createCity } from '../Module/CityModule';

export const createCityRoute = async (req: Request, res: Response) => {
  try {
    const { name, longitude, latitude, districtId } = req.body;

    const cityData = {
      name,
      longitude,
      latitude,
      districtId,
    };

    const createdCity = await createCity(cityData);

    res.status(201).json({ message: 'City created successfully', city: createdCity });
  } catch (error) {
    console.log('Failed to create City:', error);
    res.status(500).json({ error: 'Failed to create City' });
  }
};
