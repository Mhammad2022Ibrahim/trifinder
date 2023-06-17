// import { AppDataSource } from "../data-source";
// import { Trips } from '../entity/Trips';

// export const createTrip = async (tripData) => {
//   try {
//     const tripRepository = AppDataSource.getRepository(Trips);

//     // Check if the name already exists
//     const existingTrip = await tripRepository.findOne({ where: { name: tripData.name } });

//     if (existingTrip) {
//       console.log('Name already exists');
//       throw new Error('Name already exists');
//     }

//     // Create a new trip entity
//     const newTrip = new Trips();
//     newTrip.name = tripData.name;
//     newTrip.relatedCity = tripData.relatedCity;
//     newTrip.user = tripData.user;
//     newTrip.description = tripData.description;

//     // Save the trip to the database
//     await tripRepository.save(newTrip);

//     return newTrip;
    
//   } catch (error) {
//     console.log('Failed to create trip:', error);
//     throw new Error('Failed to create trip');
//   }
// };
