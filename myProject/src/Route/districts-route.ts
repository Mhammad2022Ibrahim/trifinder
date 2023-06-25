import { Request, Response } from 'express';
import { createDistrict, getDistrictsByCountry } from '../Module/districts-module';

export const createDistrictRoute = async (req: Request, res: Response) => {
  try {
    const { name ,countryId } = req.body;

    const districtData = {
      name,
      countryId 
    };

    const createdDistrict = await createDistrict(districtData);

    res.status(201).json({ message: 'District created successfully', district: createdDistrict });
  } catch (error) {
    console.log('Failed to create District:', error);
    res.status(500).json({ error: 'Failed to create District' });
  }
};


export const getAlldistricts = async (req: Request, res: Response) => {
  try {
    const { country } = req.body; 

    const districts = await getDistrictsByCountry(country);

    res.status(200).json({ districts });
  } catch (error) {
    console.log('Failed to fetch districts:', error);
    res.status(500).json({ error: 'Failed to fetch districts' });
  }
};
