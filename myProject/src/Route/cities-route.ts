import { Request, Response } from 'express';
import { createCity, getCitiesByName , getCitiesByCountryAndDistrict} from '../Module/cities-module';

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
    const { district, page, pageSize } = req.query;

    const districtId = Number(district);
    const pageNumber = Number(page) || 1;
    const citiesPerPage = Number(pageSize) || 30;

    if (!districtId) {
      res.status(400).json({ error: 'District parameter is missing !' });
      return;
    }

    const cities = await getCitiesByCountryAndDistrict(districtId, pageNumber, citiesPerPage);

    res.status(200).json({ cities });
  } catch (error) {
    console.log('Failed to fetch cities:', error);
    res.status(500).json({ error: 'Failed to fetch cities' });
  }
};

// GET /allcities?district=1&page=1&pageSize=30
// GET /allcities?district=1&page=2&pageSize=30
// GET /allcities?district=1&page=3&pageSize=30


