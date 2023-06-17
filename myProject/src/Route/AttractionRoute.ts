// import { Request, Response } from 'express';
// import { createAttraction } from '../Module/AttractionModule';

// export const createAttractionRoute = async (req: Request, res: Response) => {
//   try {
//     const { name, typeAttraction, relatedId } = req.body;

//     const attractionData = {
//       name,
//       typeAttraction,
//       relatedId,
//       id: undefined,
//       nbReview: null,
//       average: null,
//       country: undefined,
//       city: undefined,
//       reviews: undefined,
//       related: undefined, // Add the 'related' property here
//     };

//     const createdAttraction = await createAttraction(attractionData);

//     res.status(201).json({ message: 'Attraction created successfully', attraction: createdAttraction });
//   } catch (error) {
//     console.log('Failed to create Attraction:', error);
//     res.status(500).json({ error: 'Failed to create Attraction' });
//   }
// };
