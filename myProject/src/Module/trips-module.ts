import { AppDataSource } from "../data-source";
import { Trips } from '../entity/Trips';
import { Users } from '../entity/Users';
import { Cities } from '../entity/Cities';

export const createTrip = async (tripData) => {
  try {
    const tripRepository = AppDataSource.getRepository(Trips);

    // Check if the name already exists
    const existingTrip = await tripRepository.findOne({ where: { name: tripData.name } });

    if (existingTrip) {
      console.log('Name already exists');
      throw new Error('Name already exists');
    }

    // Check if the user ID exists
    const userRepository = AppDataSource.getRepository(Users);
    const existingUser = await userRepository.findOne({where:{id:tripData.userId}});

    if (!existingUser) {
      console.log('User ID does not exist');
      throw new Error('User ID does not exist');
    }

    // Check if the city ID exists
    const cityRepository = AppDataSource.getRepository(Cities);
    const existingCity = await cityRepository.findOne({where:{id:tripData.cityId}});

    if (!existingCity) {
      console.log('City ID does not exist');
      throw new Error('City ID does not exist');
    }

    // Create a new trip entity
    const newTrip = new Trips();
    newTrip.name = tripData.name;
    newTrip.cityId = tripData.cityId;
    newTrip.userId = tripData.userId;
    newTrip.description = tripData.description;

    // Save the trip to the database
    await tripRepository.save(newTrip);

    return newTrip;
    
  } catch (error) {
    console.log('Failed to create trip:', error);
    throw new Error('Failed to create trip');
  }
};
