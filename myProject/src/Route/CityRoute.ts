import { Request, Response } from 'express';
import { createCity, getCitiesByName , getCitiesByCountryAndDistrict} from '../Module/CityModule';

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

export const getCitiesByNameRoute = async (req: Request, res: Response) => {
  try {
    const { name } = req.query;

    if (!name) {
      res.status(400).json({ error: 'Name parameter is missing' });
      return;
    }

    const cities = await getCitiesByName(name as string);

    res.status(200).json({ cities });
  } catch (error) {
    console.log('Failed to fetch cities by name:', error);
    res.status(500).json({ error: 'Failed to fetch cities by name' });
  }
};

  
export const getAllCities = async (req: Request, res: Response) => {
  try {
    const {district } = req.body; // Assuming the country and district are sent in the request body

    // Replace the following line with your logic to fetch cities based on the country and district from the database
    const cities = await getCitiesByCountryAndDistrict(district);

    res.status(200).json({ cities });
  } catch (error) {
    console.log('Failed to fetch cities:', error);
    res.status(500).json({ error: 'Failed to fetch cities' });
  }
};






