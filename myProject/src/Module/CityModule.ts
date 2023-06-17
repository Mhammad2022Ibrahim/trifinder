import { AppDataSource } from "../data-source";
import { Cities } from '../entity/Cities';

export const createCity = async (cityData: Partial<Cities>) => {
  try {
    const cityRepository = AppDataSource.getRepository(Cities);

    // Check if the name already exists
    const existingName = await cityRepository.findOne({ where: { name: cityData.name } });

    if (existingName) {
      console.log('Name already exists');
      throw new Error('Name already exists');
    }
    
    // Create the city
    const city = new Cities();
    city.name = cityData.name;
    city.longitude = cityData.longitude;
    city.latitude = cityData.latitude;
    city.districtId = cityData.districtId;

    // Save the city to the database
    const createdCity = await cityRepository.save(city);

    return createdCity;
  } catch (error) {
    console.log('Failed to create city:', error);
    throw new Error('Failed to create city');
  }
};
