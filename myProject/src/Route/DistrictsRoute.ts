import { Request, Response } from 'express';
import { createDistrict } from '../Module/DistrictsModule';

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
