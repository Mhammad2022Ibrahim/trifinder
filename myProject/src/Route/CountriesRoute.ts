import { Request, Response } from 'express';
import { createCountry } from '../Module/CountriesModule';

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
