import { AppDataSource } from '../data-source';
import { Countries } from '../entity/Countries';

export const createCountry = async (countryData: Partial<Countries>) => {
  try {
    const countryRepository = AppDataSource.getRepository(Countries);

    // Check if the name already exists
    const existingCountry = await countryRepository.findOne({ where: { name: countryData.name } });

    if (existingCountry) {
      console.log('This country name already exists');
      throw new Error('Country name already exists');
    }

    // Create the country
    const country = new Countries();
    country.name = countryData.name;

    // Save the country to the database
    const createdCountry = await countryRepository.save(country);
    return createdCountry;

  } catch (error) {
    console.log('Failed to create Country:', error);
    throw new Error('Failed to create Country');
  }
};
