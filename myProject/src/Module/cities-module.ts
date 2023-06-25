import { AppDataSource } from '../data-source';
import { Cities } from '../entity/Cities';
import { Districts } from '../entity/Districts';

export const createCity = async (cityData: Partial<Cities>) => {
  try {
    const cityRepository = AppDataSource.getRepository(Cities);

    // Check if the name already exists
    const existingCity = await cityRepository.findOne({ where: { name: cityData.name } });

    if (existingCity) {
      console.log('This city name already exists');
      throw new Error('City name already exists');
    }

    // Check if the districtId exists
    const districtRepository = AppDataSource.getRepository(Districts);
    const existingDistrict = await districtRepository.findOne({ where: { id: cityData.districtId } });

    if (!existingDistrict) {
      console.log('District not found');
      throw new Error('District not found');
    }

    // Create the city
    const city = new Cities();
    city.name = cityData.name;
    city.districtId = cityData.districtId;
    city.longitude = cityData.longitude;
    city.latitude = cityData.latitude;

    // Save the city to the database
    const createdCity = await cityRepository.save(city);
    return createdCity;

  } catch (error) {
    console.log('Failed to create City:', error);
    throw new Error('Failed to create City');
  }
};


export const getCitiesByName = async (name: string) => {
  try {
    const cityRepository = AppDataSource.getRepository(Cities);
    const cities = await cityRepository.find({ where: { name } });
    return cities;
  } catch (error) {
    console.log('Failed to fetch cities by name:', error);
    throw new Error('Failed to fetch cities by name');
  }
};


export const getCitiesByCountryAndDistrict = async (district: number, page: number = 1, pageSize: number = 30) => {
  try {
    const cityRepository = AppDataSource.getRepository(Cities);
    const skip = (page - 1) * pageSize;

    const cities = await cityRepository.find({
      where: { districtId: district },
      skip,
      take: pageSize,
    });

    return cities;
  } catch (error) {
    console.log('Failed to fetch cities:', error);
    throw new Error('Failed to fetch cities');
  }
};




