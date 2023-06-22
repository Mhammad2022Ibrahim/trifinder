import { AppDataSource } from '../data-source';
import { Districts } from '../entity/Districts';
import { Countries } from '../entity/Countries';

export const createDistrict = async (districtData: Partial<Districts>) => {
  try {
    const districtRepository = AppDataSource.getRepository(Districts);

    // Check if the name already exists
    const existingDistrict = await districtRepository.findOne({ where: { name: districtData.name } });

    if (existingDistrict) {
      console.log('This district name already exists');
      throw new Error('District name already exists');
    }

    // Check if the countryId exists
    const countryRepository = AppDataSource.getRepository(Countries);
    const existingCountry = await countryRepository.findOne({ where: { id: districtData.countryId } });

    if (!existingCountry) {
      console.log('Country not found');
      throw new Error('Country not found');
    }

    // Create the district
    const district = new Districts();
    district.name = districtData.name;
    district.countryId = districtData.countryId;

    // Save the district to the database
    const createdDistrict = await districtRepository.save(district);
    return createdDistrict;

  } catch (error) {
    console.log('Failed to create District:', error);
    throw new Error('Failed to create District');
  }
};


export const getDistrictsByCountry = async (country: number) => {
  try {
    const districtsRepository = AppDataSource.getRepository(Districts);
    const districts = await districtsRepository.find({ where: { countryId: country } });
    return districts;
  } catch (error) {
    console.log('Failed to fetch districts:', error);
    throw new Error('Failed to fetch districts');
  }
};