import { Request, Response } from 'express';
import { createCountry, getCountryByName } from '../Module/countries-module';

export const createCountryRoute = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const countryData = {
      name,
    };

    const createdCountry = await createCountry(countryData);

    res.status(201).json({ message: 'Country created successfully', country: createdCountry });
  } catch (error) {
    console.log('Failed to create Country:', error);
    res.status(500).json({ error: 'Failed to create Country' });
  }
};


export const getCountryByNameRoute = async (req: Request, res: Response) => {
  try {
    const { name } = req.query;

    if (!name) {
      res.status(400).json({ error: 'Name parameter is missing' });
      return;
    }

    const country = await getCountryByName(name as string);

    res.status(200).json({ country });
  } catch (error) {
    console.log('Failed to fetch country by name:', error);
    res.status(500).json({ error: 'Failed to fetch country by name' });
  }
};