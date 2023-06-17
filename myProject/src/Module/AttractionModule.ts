// import { AppDataSource } from '../data-source';
// import { Attractions } from '../entity/Attractions';

// export const createAttraction = async (attractionData: Partial<Attractions>) => {
//   try {
//     const attractionRepository = AppDataSource.getRepository(Attractions);

//     // Check if the name already exists
//     const existingAttraction = await attractionRepository.findOne({ where: { name: attractionData.name } });

//     if (existingAttraction) {
//       console.log('This attraction name already exists');
//       throw new Error('Attraction name already exists');
//     }

//     // Create the attraction
//     const attraction = new Attractions();
//     attraction.name = attractionData.name;
//     attraction.typeAttraction = attractionData.typeAttraction;
//     attraction.relatedId = attractionData.relatedId;

//     // Save the attraction to the database
//     const createdAttraction = await attractionRepository.save(attraction);
//     return createdAttraction;

//   } catch (error) {
//     console.log('Failed to create Attraction:', error);
//     throw new Error('Failed to create Attraction');
//   }
// };
