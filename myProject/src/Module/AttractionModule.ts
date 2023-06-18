// Import the necessary dependencies
import { AppDataSource } from '../data-source';
import { Attractions } from '../entity/Attractions';

export const createAttraction = async (attractionData: Partial<Attractions>) => {
  try {
    const attractionRepository = AppDataSource.getRepository(Attractions);

    // Check if the name already exists
    const existingAttraction = await attractionRepository.findOne({ where: { name: attractionData.name } });

    if (existingAttraction) {
      console.log('This attraction name already exists');
      throw new Error('Attraction name already exists');
    }

    // Create the attraction
    const attraction = new Attractions();
    attraction.name = attractionData.name;

    // Set the attraction type based on the provided parameter
    if (attractionData.attractionType === 1) {
      attraction.attractionType = 1; // 1 represents restaurant
    } else if (attractionData.attractionType === 2) {
      attraction.attractionType = 2; // 2 represents historical monuments
    } else {
      console.log('Invalid attraction type');
      throw new Error('Invalid attraction type');
    }

    attraction.cityId = attractionData.cityId;
    attraction.average = attractionData.average || 0;
    attraction.nbReview = attractionData.nbReview || 0;

    // Save the attraction to the database
    const createdAttraction = await attractionRepository.save(attraction);
    return createdAttraction;

  } catch (error) {
    console.log('Failed to create Attraction:', error);
    throw new Error('Failed to create Attraction');
  }
};
