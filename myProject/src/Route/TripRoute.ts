// import { Request, Response } from 'express';
// import { createTrip } from '../Module/TripModule';

// export const createTripRoute = async (req: Request, res: Response) => {
//   try {
//     const { name, relatedCity, user, description } = req.body;

//     const tripData = {
//       name,
//       relatedCity,
//       user,
//       description,
//     };

//     const trip = await createTrip(tripData);

//     res.status(201).json({ message: 'Trip created successfully', trip });
//   } catch (error) {
//     console.log('Failed to create trip:', error);
//     res.status(500).json({ error: 'Failed to create trip' });
//   }
// };
